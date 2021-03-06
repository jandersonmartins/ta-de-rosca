import MongooseConnection from '../../config/mongoose/MongooseConnection'
import MongooseSpeedTestRepository from './MongooseSpeedTestRepository'
import SpeedTestDocument from '../../models/mongoose/SpeedTest'
import { speedTestDataFactory } from '../../../tests/factories/SpeedTestData'
import SpeedTestData from '../../../speed-test/dto/SpeedTestData'

describe('MongooseSpeedTestRepository', () => {
  let mongooseConnection: MongooseConnection

  const cleanUp = async (): Promise<void> => {
    await SpeedTestDocument.deleteMany({})
  }

  beforeAll(async () => {
    // TODO: accept MONGO_URL environment variable
    mongooseConnection = new MongooseConnection('mongodb://localhost:27017/ta-de-rosca-test')
    await mongooseConnection.start()
  })

  afterAll(async () => {
    await mongooseConnection.stop()
  })

  describe('save', () => {
    beforeAll(async () => {
      await cleanUp()
    })

    afterAll(async () => {
      await cleanUp()
    })

    it('should return saved speed test', async () => {
      const data = speedTestDataFactory()
      const respository = new MongooseSpeedTestRepository()

      const result = await respository.save(data)

      expect(result.uuid).toBeDefined()
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
      expect(result.dateTime).toEqual(data.dateTime)
    })
  })

  describe('getAll', () => {
    const data: SpeedTestData = speedTestDataFactory()

    beforeAll(async () => {
      await SpeedTestDocument.create(data)
    })

    afterAll(async () => {
      await cleanUp()
    })

    test('should return all SpeedTestData', async () => {
      const [result] = await new MongooseSpeedTestRepository().getAll(1)

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
      expect(result.dateTime).toEqual(data.dateTime)
    })
  })
})
