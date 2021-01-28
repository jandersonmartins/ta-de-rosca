import SpeedTestCrawler, { CrawlOutput } from '../../speed-test/services/SpeedTestCrawler'
import { speedTestDataFactory } from '../factories/SpeedTestData'

class FakeSpeedTestCrawler implements SpeedTestCrawler {
  async crawl (): Promise<CrawlOutput> {
    return {
      speedTestData: speedTestDataFactory(),
      screenshot: Buffer.from('')
    }
  }
}

export default FakeSpeedTestCrawler
