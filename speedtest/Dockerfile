FROM node:alpine

RUN mkdir /app

WORKDIR /app

# Installs latest Chromium (85) package.
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  freetype-dev \
  harfbuzz \
  ca-certificates \
  ttf-freefont

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# It's a good idea to use dumb-init to help prevent zombie chrome processes.
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# copy app files
COPY package*.json ./

# install dependencis
RUN npm install

RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
  && mkdir -p /home/pptruser/Downloads /app \
  && chown -R pptruser:pptruser /home/pptruser \
  && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

COPY . .

ARG MONGO_URL
ARG DEBUG
ARG SCREENSHOT_SERVICE
ARG SERVER_PORT

ENV MONGO_URL $MONGO_URL
ENV DEBUG $DEBUG
ENV SCREENSHOT_SERVICE $SCREENSHOT_SERVICE
ENV SERVER_PORT $SERVER_PORT

RUN npm run build

ENTRYPOINT ["dumb-init", "--"]

CMD [ "node", "build/src/ui/cron/index.js" ]
