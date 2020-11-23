import SpeedTestData from '../dto/SpeedTestData'

interface SpeedTesteRepository {
  save (data: SpeedTestData): Promise<void>
}

export default SpeedTesteRepository
