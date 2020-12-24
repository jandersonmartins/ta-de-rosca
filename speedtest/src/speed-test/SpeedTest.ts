import SpeedTestData from './dto/SpeedTestData'
import SpeedTesteRepository from './repositories/SpeedTestRepository'
import ScreenshotUpload from './services/ScreenshotUpload'
import SpeedTestCrawler from './services/SpeedTestCrawler'

class SpeedTest {
  constructor (
    private speedTestCrawler: SpeedTestCrawler,
    private speedTestRepository: SpeedTesteRepository,
    private screenShotUpload: ScreenshotUpload
  ) {}

  async run (): Promise<SpeedTestData> {
    const { speedTestData, screenshot } = await this.speedTestCrawler.crawl()

    const result = await this.speedTestRepository.save(speedTestData)

    await this.screenShotUpload.upload(screenshot, speedTestData.screenshot!)

    return result
  }
}

export default SpeedTest
