import SpeedTestData from './dto/SpeedTestData'
import SpeedTestRepository from './repositories/SpeedTestRepository'

class SpeedTestList {
  constructor (
    private speedTestRepository: SpeedTestRepository
  ) {}

  async run (): Promise<SpeedTestData[]> {
    return await this.speedTestRepository.getAll()
  }
}

export default SpeedTestList
