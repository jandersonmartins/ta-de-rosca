# Crawler

## Development

Start cron task:

```sh
MONGO_URL=mongodb://localhost:27017/ta-de-rosca npm run dev:cron
```

## Tests

Lint:

```sh
npm run lint
```

Run all tests:

```sh
npm test
```

PS: Ensure you have a mongodb started on mongodb://localhost:27017/ta-de-rosca-test. You can use docker-compose to startup mongodb:

```sh
docker-compose up mongo
```
