FROM golang:1.15-alpine

WORKDIR /app

ENV GO111MODULE=on

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o screenshotstorage src/ui/http/main.go

EXPOSE 3001

ARG SCREENSHOT_DIR

ENV SCREENSHOT_DIR $SCREENSHOT_DIR

CMD [ "./screenshotstorage" ]
