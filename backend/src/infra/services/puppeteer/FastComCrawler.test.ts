import { createServer, Server } from 'http'
import { createReadStream } from 'fs'
import { join } from 'path'

import FastComCrawler from './FastComCrawler'

describe('FastComCrawler', () => {
  let server: Server

  beforeAll(async () => {
    await new Promise(resolve => {
      server = createServer((_, res) => {
        createReadStream(join(__dirname, '/fixtures/example.html')).pipe(res)
      })

      server.listen(4001, () => resolve())
    })
  })

  afterAll(async () => {
    await new Promise(resolve => {
      server.close(() => resolve())
    })
  })

  it('should return crawled data from fast.com', async () => {
    const crawler = new FastComCrawler('http://localhost:4001')

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
  })
})
