import { Application } from 'express'
import { getAll } from './handlers/get-all'

export const speedTestRoutes = (app: Application): void => {
  app.get('/speed-tests', getAll)
}
