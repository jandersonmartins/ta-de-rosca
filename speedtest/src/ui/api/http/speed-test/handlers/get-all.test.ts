import request from 'supertest'

import SpeedTestData from '../../../../../speed-test/dto/SpeedTestData'
import MongooseConnection from '../../../../../infra/config/mongoose/MongooseConnection'
import SpeedTestDocument from '../../../../../infra/models/mongoose/SpeedTest'
import { speedTestDataFactory } from '../../../../../tests/factories/SpeedTestData'
import { start, stop } from '../../../app'

jest.setTimeout(30000)

describe('GET /speed-tests', () => {
  const data: SpeedTestData = speedTestDataFactory()
  let mongooseConnection: MongooseConnection

  beforeAll(async () => {
    mongooseConnection = new MongooseConnection('mongodb://localhost:27017/ta-de-rosca-api-test')
    await mongooseConnection.start()
    await SpeedTestDocument.create(data)
    await start()
  })

  afterAll(async () => {
    await SpeedTestDocument.deleteMany({})
    await mongooseConnection.stop()
    await stop()
  })

  it('should respond json with speed test list', async () => {
    const res = await request('http://localhost:4001')
      .get('/speed-tests?page=1')

    const expected = res.body[0]

    expect(expected.downloadSpeed).toEqual(data.downloadSpeed)
    expect(expected.uploadSpeed).toEqual(data.uploadSpeed)
    expect(expected.downloadUnit).toEqual(data.downloadUnit)
    expect(expected.uploadUnit).toEqual(data.uploadUnit)
    expect(expected.ip).toEqual(data.ip)
    expect(expected.ping).toEqual(data.ping)
    expect(expected.pingUnit).toEqual(data.pingUnit)
    expect(expected.requestLocation).toEqual(data.requestLocation)
    expect(expected.serverLocation).toEqual(data.serverLocation)
    expect(expected.service).toEqual(data.service)
    expect(expected.serviceLocation).toEqual(data.serviceLocation)
    expect(expected.screenshot).toEqual(data.screenshot)
  })
})
