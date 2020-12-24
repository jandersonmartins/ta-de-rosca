import { connect, Connection, connection } from 'mongoose'

class MongooseConnection {
  constructor (private url: string) {}

  async start (): Promise<Connection> {
    return await new Promise((resolve, reject) => {
      connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
      })

      connection.on('error', err => reject(err))

      connection.once('open', () => resolve(connection))
    })
  }

  async stop (): Promise<void> {
    await new Promise(resolve =>
      connection.close(() =>
        resolve(undefined)
      )
    )
  }
}

export default MongooseConnection
