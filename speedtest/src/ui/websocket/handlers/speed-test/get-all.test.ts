import { io, Socket } from 'socket.io-client'

import MongooseConnection from '../../../../infra/config/mongoose/MongooseConnection'
import SpeedTestData from '../../../../speed-test/dto/SpeedTestData'
import SpeedTestDocument from '../../../../infra/models/mongoose/SpeedTest'
import { speedTestDataFactory } from '../../../../tests/factories/SpeedTestData'
import { start, stop } from '../../app'

jest.setTimeout(30000)

describe('getAll handler', () => {
  const data: SpeedTestData = speedTestDataFactory()
  let socket: Socket
  let mongooseConnection: MongooseConnection

  beforeAll(async () => {
    mongooseConnection = new MongooseConnection('mongodb://localhost:27017/ta-de-rosca-e2e-test')
    await mongooseConnection.start()
    await SpeedTestDocument.create(data)
    await start()
    socket = io('http://localhost:4001')
  })

  afterAll(async () => {
    socket.disconnect()
    await SpeedTestDocument.deleteMany({})
    await mongooseConnection.stop()
    await stop()
  })

  it('should respond event with speed test list', done => {
    socket.on('speed-test-all', (received: SpeedTestData[]) => {
      const [result] = received
      expect(result.downloadSpeed).toEqual(data.downloadSpeed)
      expect(result.uploadSpeed).toEqual(data.uploadSpeed)
      expect(result.downloadUnit).toEqual(data.downloadUnit)
      expect(result.uploadUnit).toEqual(data.uploadUnit)
      expect(result.ip).toEqual(data.ip)
      expect(result.ping).toEqual(data.ping)
      expect(result.pingUnit).toEqual(data.pingUnit)
      expect(result.requestLocation).toEqual(data.requestLocation)
      expect(result.serverLocation).toEqual(data.serverLocation)
      expect(result.service).toEqual(data.service)
      expect(result.serviceLocation).toEqual(data.serviceLocation)
      expect(result.screenshot).toEqual(data.screenshot)
      done()
    })

    socket.emit('speed-test-get-all')
  })
})
