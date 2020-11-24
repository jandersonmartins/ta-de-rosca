import SpeedTestData from '../../../speed-test/dto/SpeedTestData'
import SpeedTesteRepository from '../../../speed-test/repositories/SpeedTestRepository'
import SpeedTestDocument from '../../models/mongoose/SpeedTest'

class MongooseSpeedTestRepository implements SpeedTesteRepository {
  async save (data: SpeedTestData): Promise<SpeedTestData> {
    const speedTestDocument = new SpeedTestDocument()

    speedTestDocument.downloadSpeed = data.downloadSpeed
    speedTestDocument.uploadSpeed = data.uploadSpeed
    speedTestDocument.downloadUnit = data.downloadUnit
    speedTestDocument.uploadUnit = data.uploadUnit
    speedTestDocument.dateTime = data.dateTime

    const saved = await speedTestDocument.save()

    return {
      ...data,
      uuid: saved._id
    }
  }
}

export default MongooseSpeedTestRepository
