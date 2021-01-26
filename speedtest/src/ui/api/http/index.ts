import { Application } from 'express'
import { speedTestRoutes } from './speed-test'

export const setupRoutes = (app: Application): void => {
  speedTestRoutes(app)
}
