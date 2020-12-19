import SpeedTestData from './dto/SpeedTestData'
import SpeedTesteRepository from './repositories/SpeedTestRepository'
import SpeedTestCrawler from './services/SpeedTestCrawler'

class SpeedTest {
  constructor (
    private speedTestCrawler: SpeedTestCrawler,
    private speedTestRepository: SpeedTesteRepository
  ) {}

  async run (): Promise<SpeedTestData> {
    const { speedTestData } = await this.speedTestCrawler.crawl()

    const result = await this.speedTestRepository.save(speedTestData)

    return result
  }
}

export default SpeedTest
