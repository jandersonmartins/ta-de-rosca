import { schedule } from 'node-cron'
import debug from 'debug'

import SpeedTest from '../../speed-test/SpeedTest'
import MongooseSpeedTestRepository from '../../infra/repositories/mongoose/MongooseSpeedTestRepository'
import MongooseConnection from '../../infra/config/mongoose/MongooseConnection'
import FastComCrawler from '../../infra/services/puppeteer/FastComCrawler'

const debugFn = debug('cron')

const init = async () => {
  const url = process.env.MONGO_URL ?? 'mongodb://localhost:27017/ta-de-rosca'
  const conn = new MongooseConnection(url)
  try {
    debugFn('connecting mongo db: %s', url)
    await conn.start()
    startTask()
    debugFn('connected')
  } catch (error) {
    debugFn('mongodb connection error: %s', error.message)
    console.error(error)
    process.exit(1)
  }
}

const startTask = async () => {
  const speedTest = new SpeedTest(
    new FastComCrawler(),
    new MongooseSpeedTestRepository()
  )

  // run every 10 minutes
  const task = schedule('0 */10 * * * *', async () => {
    try {
      debugFn('task started at %s', new Date())
      const data = await speedTest.run()
      debugFn('internet data: %O', data)
      debugFn('task finshed at %s', new Date())
    } catch (e) {
      debugFn('task error: %s', e.message)
      // TODO: save log
      console.error(e)
    }
  })

  task.start()

  const stop = () => {
    debugFn('process stopped')
    task.stop()
    process.exit(0)
  }

  process.on('SIGINT', stop)
  process.on('unhandledRejection', stop)
}

init()
