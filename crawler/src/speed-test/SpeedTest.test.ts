import { speedTestDataFactory } from '../tests/factories/SpeedTestData'
import SpeedTestData from './dto/SpeedTestData'
import SpeedTesteDataRepository from './repositories/SpeedTestRepository'
import ScreenshotUpload from './services/ScreenshotUpload'
import SpeedTestCrawler from './services/SpeedTestCrawler'
import SpeedTest from './SpeedTest'

describe('SpeedTest', () => {
  it('should run SpeedTesteDataRepository with service response', async () => {
    const data: SpeedTestData = speedTestDataFactory()

    const MockSpeedTestCrawler = jest.fn<SpeedTestCrawler, any>(() => ({
      crawl: jest.fn().mockResolvedValue({
        speedTestData: data,
        screenshot: Buffer.from('')
      })
    }))

    const MockSpeedTesteDataRepository = jest.fn<SpeedTesteDataRepository, any>(() => ({
      save: jest.fn()
    }))

    const MockScreenshotUpload = jest.fn<ScreenshotUpload, any>(() => ({
      upload: jest.fn()
    }))

    const speedTestCrawler = new MockSpeedTestCrawler()
    const speedTestRepository = new MockSpeedTesteDataRepository()
    const screenShotUpload = new MockScreenshotUpload()

    const fnRepositorySpy = jest.spyOn(speedTestRepository, 'save')

    await new SpeedTest(
      speedTestCrawler,
      speedTestRepository,
      screenShotUpload
    ).run()

    expect(fnRepositorySpy).toBeCalledWith(data)
  })

  it('should return SpeedTestData', async () => {
    const data: SpeedTestData = speedTestDataFactory()

    const MockSpeedTestCrawler = jest.fn<SpeedTestCrawler, any>(() => ({
      crawl: jest.fn().mockResolvedValue({
        speedTestData: data,
        screenshot: Buffer.from('')
      })
    }))

    const MockSpeedTesteDataRepository = jest.fn<SpeedTesteDataRepository, any>(() => ({
      save: jest.fn().mockResolvedValue({
        uuid: '000-xxxx',
        ...data
      })
    }))

    const MockScreenshotUpload = jest.fn<ScreenshotUpload, any>(() => ({
      upload: jest.fn()
    }))

    const speedTestCrawler = new MockSpeedTestCrawler()
    const speedTestRepository = new MockSpeedTesteDataRepository()
    const screenShotUpload = new MockScreenshotUpload()

    const result = await new SpeedTest(
      speedTestCrawler,
      speedTestRepository,
      screenShotUpload
    ).run()

    expect(result.uuid).toBeDefined()
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

  it('should call service with screenshot data', async () => {
    const data: SpeedTestData = speedTestDataFactory()
    const screenshot = Buffer.from('')

    const MockSpeedTestCrawler = jest.fn<SpeedTestCrawler, any>(() => ({
      crawl: jest.fn().mockResolvedValue({
        speedTestData: data,
        screenshot
      })
    }))

    const MockSpeedTesteDataRepository = jest.fn<SpeedTesteDataRepository, any>(() => ({
      save: jest.fn().mockResolvedValue({
        uuid: '000-xxxx',
        ...data
      })
    }))

    const uploadMock = jest.fn()
    const MockScreenshotUpload = jest.fn<ScreenshotUpload, any>(() => ({
      upload: uploadMock
    }))

    const speedTestCrawler = new MockSpeedTestCrawler()
    const speedTestRepository = new MockSpeedTesteDataRepository()
    const screenShotUpload = new MockScreenshotUpload()

    const result = await new SpeedTest(
      speedTestCrawler,
      speedTestRepository,
      screenShotUpload
    ).run()

    expect(uploadMock).toBeCalledWith(screenshot, result.screenshot)
  })
})
