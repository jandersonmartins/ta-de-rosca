import { createServer, Server } from 'http'
import { createReadStream, mkdir } from 'fs'
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
        mkdir(path, () => {
          resolve()
        })
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
      url: 'http://localhost:4001',
      screenShotOutputDir: path
    })

    const result = await crawler.crawl()

    expect(result.downloadSpeed).toEqual('26')
    expect(result.uploadSpeed).toEqual('26')
    expect(result.downloadUnit).toEqual('Mbps')
    expect(result.uploadUnit).toEqual('Mbps')
    expect(result.ip).toEqual('45.178.202.15')
    expect(result.ping).toEqual('22')
    expect(result.pingUnit).toEqual('ms')
    expect(result.requestLocation).toEqual('Maceio, BR')
    expect(result.serverLocation).toEqual('Rio Largo, BR')
    expect(result.service).toEqual('fast')
    expect(result.serviceLocation).toEqual('https://fast.com')
    expect(result.screenshot).toBeDefined()
  })
})
