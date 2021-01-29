import { useEffect, useState } from 'react'

import SpeedTestData from './SpeedTestData'

const SERVER_URL = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:4001'

export interface UseSpeedTestOutput {
  data: SpeedTestData[]
  nextPage: () => void
}

const useSpeedTestData = (): UseSpeedTestOutput => {
  const [page, setPage] = useState<number>(1)
  const [data, setSpeedTestData] = useState<SpeedTestData[]>([])

  useEffect(() => {
    const load = async (pageRequest: number): Promise<void> => {
      try {
        const res = await fetch(`${SERVER_URL}/speed-tests?page=${pageRequest}`)
        const jsonData: SpeedTestData[] = await res.json()
        if (jsonData.length) {
          setSpeedTestData(d => [...d, ...jsonData])
        }
      } catch (err) {
        // TODO: return error
      }
    }

    load(page)
  }, [page])

  const nextPage = () => setPage(page + 1)

  return { data, nextPage }
}

export { useSpeedTestData }
