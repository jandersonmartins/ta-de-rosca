import SpeedTestData from './dto/SpeedTestData'
import SpeedTesteRepository from './repositories/SpeedTestRepository'
import SpeedTestCrawler from './services/SpeedTestCrawler'

class SpeedTest {
  constructor (
    private speedTestCrawler: SpeedTestCrawler,
    private speedTestRepository: SpeedTesteRepository
  ) {}

  async run (): Promise<SpeedTestData> {
    const result = await this.speedTestRepository.save(
      await this.speedTestCrawler.crawl()
    )

    return result
  }
}

export default SpeedTest
