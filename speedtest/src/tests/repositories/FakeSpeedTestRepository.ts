import SpeedTestData from '../../speed-test/dto/SpeedTestData'
import SpeedTestRepository from '../../speed-test/repositories/SpeedTestRepository'

class FakeSpeedTestRepository implements SpeedTestRepository {
  constructor (
    private savedData: SpeedTestData[] = []
  ) {}

  async save (data: SpeedTestData): Promise<SpeedTestData> {
    if (!data.uuid) {
      data.uuid = (this.savedData.length + 1).toString()
      this.savedData.push(data)
    }
    return data
  }

  async getAll (page: number): Promise<SpeedTestData[]> {
    page = page === 0 ? page : page - 1
    return this.savedData.slice(page)
  }
}

export default FakeSpeedTestRepository
