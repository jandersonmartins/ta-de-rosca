import SpeedTestData from '../../speed-test/dto/SpeedTestData'
import SpeedTestRepository from '../../speed-test/repositories/SpeedTestRepository'
import { speedTestDataFactory } from '../factories/SpeedTestData'

class FakeSpeedTestRepository implements SpeedTestRepository {
  async save (data: SpeedTestData): Promise<SpeedTestData> {
    return speedTestDataFactory()
  }

  async getAll (): Promise<SpeedTestData[]> {
    return []
  }
}

export default FakeSpeedTestRepository
