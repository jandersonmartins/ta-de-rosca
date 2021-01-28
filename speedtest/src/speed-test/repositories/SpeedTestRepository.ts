import SpeedTestData from '../dto/SpeedTestData'

interface SpeedTestRepository {
  save (data: SpeedTestData): Promise<SpeedTestData>
  getAll (page: number): Promise<SpeedTestData[]>
}

export default SpeedTestRepository
