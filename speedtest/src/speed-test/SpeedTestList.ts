import SpeedTestData from './dto/SpeedTestData'
import SpeedTestRepository from './repositories/SpeedTestRepository'

export interface SpeedTestListData {
  page: number
}

class SpeedTestList {
  constructor (
    private speedTestRepository: SpeedTestRepository
  ) {}

  async run ({ page }: SpeedTestListData): Promise<SpeedTestData[]> {
    return await this.speedTestRepository.getAll(page)
  }
}

export default SpeedTestList
