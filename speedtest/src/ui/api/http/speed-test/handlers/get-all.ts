import { NextFunction, Request, Response } from 'express'
import debug from 'debug'

import MongooseSpeedTestRepository from '../../../../../infra/repositories/mongoose/MongooseSpeedTestRepository'
import SpeedTestList from '../../../../../speed-test/SpeedTestList'

const debugFn = debug('server')

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1

    const data = await new SpeedTestList(
      new MongooseSpeedTestRepository()
    ).run({ page })

    debugFn('speed test list: %o', data)

    res.json(data)
  } catch (error) {
    debugFn('speed test list error: %s', error.message)
    next(error)
  }
}
