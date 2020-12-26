import { Socket } from 'socket.io'
import MongooseSpeedTestRepository from '../../../../infra/repositories/mongoose/MongooseSpeedTestRepository'
import SpeedTestList from '../../../../speed-test/SpeedTestList'

export const getAll = (socket: Socket) => async () => {
  try {
    const data = await new SpeedTestList(
      new MongooseSpeedTestRepository()
    ).run()
    socket.emit('speed-test-all', data)
  } catch (error) {
    socket.emit('speed-test-all-error')
  }
}
