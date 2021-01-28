import { speedTestDataFactory } from '../tests/factories/SpeedTestData'
import FakeSpeedTestRepository from '../tests/repositories/FakeSpeedTestRepository'
import SpeedTestData from './dto/SpeedTestData'
import SpeedTestList from './SpeedTestList'

describe('SpeedTestList', () => {
  it('should return an array with speedtest data', async () => {
    const data: SpeedTestData = speedTestDataFactory()
    const data2: SpeedTestData = speedTestDataFactory()

    const speedTestRespository = new FakeSpeedTestRepository()

    await speedTestRespository.save(data)
    await speedTestRespository.save(data2)

    const result = await new SpeedTestList(
      speedTestRespository
    ).run({ page: 1 })

    expect(result).toEqual([data, data2])
  })
})
