import { join } from 'path'
import { mkdir } from 'fs'
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
  const outputFiles = join(__dirname, 'tmp')

  const speedTest = new SpeedTest(
    new FastComCrawler({
      screenShotOutputDir: outputFiles
    }),
    new MongooseSpeedTestRepository()
  )

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

  mkdir(outputFiles, () => {
    task.start()
  })

  const stop = () => {
    task.stop()
    process.exit(0)
  }

  process.on('SIGINT', stop)
  process.on('unhandledRejection', stop)
}

init()
