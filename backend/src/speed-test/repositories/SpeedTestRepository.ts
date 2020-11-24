import SpeedTestData from '../dto/SpeedTestData'

interface SpeedTestRepository {
  save (data: SpeedTestData): Promise<void>
}

export default SpeedTestRepository
