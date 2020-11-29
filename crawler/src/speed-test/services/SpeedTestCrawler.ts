import SpeedTestData from '../dto/SpeedTestData'

interface SpeedTestCrawler {
  crawl (): Promise<SpeedTestData>
}

export default SpeedTestCrawler
