import { connect, connection } from 'mongoose'

class MongooseConnection {
  constructor (private url: string) {}

  async start (): Promise<void> {
    await new Promise((resolve, reject) => {
      connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
      })

      connection.on('error', err => reject(err))

      connection.once('open', () => resolve())
    })
  }

  async stop (): Promise<void> {
    await new Promise(resolve =>
      connection.close(() =>
        resolve()
      )
    )
  }
}

export default MongooseConnection
