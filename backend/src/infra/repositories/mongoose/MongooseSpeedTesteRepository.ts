import SpeedTestData from '../../../speed-test/dto/SpeedTestData'
import SpeedTesteRepository from '../../../speed-test/repositories/SpeedTesteRepository'

class MongooseSpeedTesteRepository implements SpeedTesteRepository {
  save (data: SpeedTestData): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export default MongooseSpeedTesteRepository
