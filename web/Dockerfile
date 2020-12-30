FROM node:alpine as build

RUN mkdir /app

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

ENV REACT_APP_SERVER_URL http://localhost:4001
ENV REACT_APP_SCREENSHOT_BASE_URL http://localhost:3001

RUN yarn build

# Run step

FROM nginx

COPY --from=build /app/build /usr/share/nginx/html
