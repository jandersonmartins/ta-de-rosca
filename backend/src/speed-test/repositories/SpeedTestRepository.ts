import SpeedTestData from '../dto/SpeedTestData'

interface SpeedTestRepository {
  save (data: SpeedTestData): Promise<SpeedTestData>
}

export default SpeedTestRepository
