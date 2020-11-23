import SpeedTesteRepository from './repository/SpeedTesteRepository'
import SpeedTestCrawler from './services/SpeedTestCrawler'

class SpeedTest {
  constructor (
    private speedTestCrawler: SpeedTestCrawler,
    private speedTestRepository: SpeedTesteRepository
  ) {}

  async run (): Promise<void> {
    await this.speedTestRepository.save(
      await this.speedTestCrawler.crawl()
    )
  }
}

export default SpeedTest
