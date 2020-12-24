import debug from 'debug'

import { start, stop } from './app'
import MongooseConnection from '../../infra/config/mongoose/MongooseConnection'

const debugFn = debug('cron')

const init = async (): Promise<void> => {
  const url = process.env.MONGO_URL ?? 'mongodb://localhost:27017/ta-de-rosca'
  const conn = new MongooseConnection(url)

  try {
    await conn.start()
    await start()
  } catch (e) {
    debugFn('error %s', e.message)
    await stop()
    process.exit(1)
  }
}

const stopExit = async (): Promise<void> => {
  await stop()
  process.exit(1)
}

process.on('SIGINT', stopExit)
process.on('unhandledRejection', stopExit)
process.on('uncaughtException', stopExit)

init()
