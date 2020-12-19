import SpeedTestData from '../dto/SpeedTestData'

export interface CrawlOutput {
  speedTestData: SpeedTestData
  screenshot: Buffer
}
interface SpeedTestCrawler {
  crawl (): Promise<CrawlOutput>
}

export default SpeedTestCrawler
