import MongooseConnection from '../../config/mongoose/MongooseConnection'
import MongooseSpeedTestRepository from './MongooseSpeedTestRepository'
import SpeedTestDocument from '../../models/mongoose/SpeedTest'

describe('MongooseSpeedTestRepository', () => {
  let mongooseConnection: MongooseConnection

  const cleanUp = async (): Promise<void> => {
    await SpeedTestDocument.deleteMany({})
  }

  beforeAll(async () => {
    mongooseConnection = new MongooseConnection('mongodb://localhost:27017/ta-de-rosca-test')
    await mongooseConnection.start()
    await cleanUp()
  })

  afterAll(async () => {
    await cleanUp()
    await mongooseConnection.stop()
  })

  it('should return saved speed test', async () => {
    const respository = new MongooseSpeedTestRepository()

    const result = await respository.save({
      dateTime: new Date(),
      downloadSpeed: 30,
      uploadSpeed: 30,
      downloadUnit: 'mb',
      uploadUnit: 'mb'
    })

    expect(result.uuid).toBeDefined()
  })
})
