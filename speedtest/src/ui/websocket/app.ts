import { createServer } from 'http'

import express from 'express'
import socketIO from 'socket.io'

const app = express()
const server = createServer(app)
const io = new socketIO.Server(server)

export const start = async (): Promise<void> => {
  return new Promise(resolve => {
    server.listen(process.env.SERVER_PORT ?? 4001, () => {
      io.on('connection', () => {})

      resolve()
    })
  })
}

export const stop = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
