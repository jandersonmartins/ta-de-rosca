import debug from 'debug'
import { Server, Socket } from 'socket.io'

import { getAll } from './speed-test/get-all'

const debugFn = debug('server')

export const setupHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    debugFn('socket connected')
    socket.on('speed-test-get-all', getAll(socket))
  })
}
