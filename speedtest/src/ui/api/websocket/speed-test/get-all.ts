import { Socket } from 'socket.io'
import debug from 'debug'

import MongooseSpeedTestRepository from '../../../../infra/repositories/mongoose/MongooseSpeedTestRepository'
import SpeedTestList from '../../../../speed-test/SpeedTestList'

const debugFn = debug('server')

export const getAll = (socket: Socket) => async () => {
  try {
    const data = await new SpeedTestList(
      new MongooseSpeedTestRepository()
    ).run()
    debugFn('speed test list: %o', data)
    socket.emit('speed-test-all', data)
  } catch (error) {
    debugFn('speed test list error: %s', error.message)
    socket.emit('speed-test-all-error')
  }
}
