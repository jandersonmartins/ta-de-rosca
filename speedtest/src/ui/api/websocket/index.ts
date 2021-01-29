import debug from 'debug'
import { Server, Socket } from 'socket.io'

const debugFn = debug('server')

export const setupHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    debugFn('socket connected')
    // TODO: implement emit event with last data collected
  })
}
