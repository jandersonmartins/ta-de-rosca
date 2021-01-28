import { speedTestDataFactory } from '../tests/factories/SpeedTestData'
import FakeSpeedTestRepository from '../tests/repositories/FakeSpeedTestRepository'
import FakeScreenshotUpload from '../tests/services/FakeScreenshotUpload'
import FakeSpeedTestCrawler from '../tests/services/FakeSpeedTestCrawler'
import SpeedTestData from './dto/SpeedTestData'
import SpeedTest from './SpeedTest'

describe('SpeedTest', () => {
  let speedTestData: SpeedTestData
  let screenshot: Buffer

  let fakeSpeedTestCrawler: FakeSpeedTestCrawler
  let fakeSpeedTestRepository: FakeSpeedTestRepository
  let fakeScreenshotUpload: FakeScreenshotUpload

  let uploadSpy: any

  let result: SpeedTestData

  beforeAll(async () => {
    // data
    speedTestData = speedTestDataFactory()
    screenshot = Buffer.from('')

    // fakes
    fakeSpeedTestCrawler = new FakeSpeedTestCrawler()
    fakeSpeedTestRepository = new FakeSpeedTestRepository()
    fakeScreenshotUpload = new FakeScreenshotUpload()

    // spies
    jest.spyOn(fakeSpeedTestCrawler, 'crawl').mockResolvedValueOnce({
      speedTestData,
      screenshot
    })

    uploadSpy = jest.spyOn(fakeScreenshotUpload, 'upload')

    // execution
    result = await new SpeedTest(
      fakeSpeedTestCrawler,
      fakeSpeedTestRepository,
      fakeScreenshotUpload
    ).run()
  })

  afterAll(() => jest.clearAllMocks())

  it('should return SpeedTestData', async () => {
    expect(result.uuid).toEqual('1')
    expect(result.downloadSpeed).toEqual('30')
    expect(result.uploadSpeed).toEqual('10')
    expect(result.downloadUnit).toEqual('mb')
    expect(result.uploadUnit).toEqual('mb')
    expect(result.ip).toEqual('45.178.202.15')
    expect(result.ping).toEqual('12')
    expect(result.pingUnit).toEqual('ms')
    expect(result.requestLocation).toEqual('Maceio, BR')
    expect(result.serverLocation).toEqual('Maceio, BR')
    expect(result.service).toEqual('fast')
    expect(result.serviceLocation).toEqual('https://fast.com')
    expect(result.screenshot).toEqual('me.jpg')
  })

  it('should call upload service with screenshot data', async () => {
    expect(uploadSpy).toBeCalledWith(screenshot, result.screenshot)
  })
})
