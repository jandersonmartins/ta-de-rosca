import SpeedTestData from './dto/SpeedTestData'
import SpeedTesteDataRepository from './repositories/SpeedTestRepository'
import SpeedTestCrawler from './services/SpeedTestCrawler'
import SpeedTest from './SpeedTest'

describe('SpeedTest', () => {
  it('should run SpeedTestCrawler', async () => {
    const MockSpeedTestCrawler = jest.fn<SpeedTestCrawler, any>(() => ({
      crawl: jest.fn()
    }))

    const MockSpeedTesteDataRepository = jest.fn<SpeedTesteDataRepository, any>(() => ({
      save: jest.fn()
    }))

    const speedTestCrawler = new MockSpeedTestCrawler()
    const speedTestRepository = new MockSpeedTesteDataRepository()

    await new SpeedTest(
      speedTestCrawler,
      speedTestRepository
    ).run()

    expect(speedTestCrawler.crawl).toBeCalled()
  })

  test('should run SpeedTesteDataRepository with service response', async () => {
    const data: SpeedTestData = {
      downloadSpeed: 30,
      uploadSpeed: 10,
      downloadUnit: 'mb',
      uploadUnit: 'mb',
      dateTime: new Date()
    }

    const MockSpeedTestCrawler = jest.fn<SpeedTestCrawler, any>(() => ({
      crawl: jest.fn().mockResolvedValue(data)
    }))

    const MockSpeedTesteDataRepository = jest.fn<SpeedTesteDataRepository, any>(() => ({
      save: jest.fn()
    }))

    const speedTestCrawler = new MockSpeedTestCrawler()
    const speedTestRepository = new MockSpeedTesteDataRepository()

    const fnRepositorySpy = jest.spyOn(speedTestRepository, 'save')

    await new SpeedTest(
      speedTestCrawler,
      speedTestRepository
    ).run()

    expect(fnRepositorySpy).toBeCalledWith(data)
  })
})
