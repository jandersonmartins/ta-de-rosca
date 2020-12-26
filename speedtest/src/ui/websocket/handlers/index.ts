import { Server, Socket } from 'socket.io'

import { getAll } from './speed-test/get-all'

export const setupHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    socket.on('speed-test-get-all', getAll(socket))
  })
}
