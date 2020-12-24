import { createServer, Server } from 'http'
import { createReadStream } from 'fs'
import { join } from 'path'
import del from 'del'

import FastComCrawler from './FastComCrawler'

describe('FastComCrawler', () => {
  const path: string = join(__dirname, 'tmp')
  let server: Server

  beforeAll(async () => {
    await new Promise(resolve => {
      server = createServer((_, res) => {
        createReadStream(join(__dirname, '/fixtures/example.html')).pipe(res)
      })

      server.listen(4001, () => {
        resolve()
      })
    })
  })

  afterAll(async () => {
    try {
      await del(path)
    } catch (e) { }
    await new Promise(resolve => {
      server.close(() => resolve())
    })
  })

  it('should return crawled data from fast.com', async () => {
    const crawler = new FastComCrawler({
      url: 'http://localhost:4001'
    })

    const result = await crawler.crawl()

    expect(result.speedTestData.downloadSpeed).toEqual('26')
    expect(result.speedTestData.uploadSpeed).toEqual('26')
    expect(result.speedTestData.downloadUnit).toEqual('Mbps')
    expect(result.speedTestData.uploadUnit).toEqual('Mbps')
    expect(result.speedTestData.ip).toEqual('45.178.202.15')
    expect(result.speedTestData.ping).toEqual('22')
    expect(result.speedTestData.pingUnit).toEqual('ms')
    expect(result.speedTestData.requestLocation).toEqual('Maceio, BR')
    expect(result.speedTestData.serverLocation).toEqual('Rio Largo, BR')
    expect(result.speedTestData.service).toEqual('fast')
    expect(result.speedTestData.serviceLocation).toEqual('https://fast.com')
  })
})
