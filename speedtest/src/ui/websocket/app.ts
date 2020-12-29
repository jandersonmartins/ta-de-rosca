import { createServer } from 'http'

import express from 'express'
import socketIO from 'socket.io'
import debug from 'debug'

import { setupHandlers } from './handlers'

const debugFn = debug('server')
const app = express()
const server = createServer(app)
const io = new socketIO.Server(server)

export const start = async (): Promise<void> => {
  return new Promise(resolve => {
    const port = process.env.SERVER_PORT ?? 4001
    server.listen(port, () => {
      debugFn('server started at %d', port)
      setupHandlers(io)
      resolve()
    })
  })
}

export const stop = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        debugFn('server stopped with error: %s', err.message)
        reject(err)
      } else {
        debugFn('server stopped')
        resolve()
      }
    })
  })
}
