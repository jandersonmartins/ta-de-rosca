import { useCallback, useEffect, useState } from 'react'

import SpeedTestData from './SpeedTestData'

const SERVER_URL = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:4001'

export interface UseSpeedTestOutput {
  data: SpeedTestData[]
  loading: boolean
  error: string | null
  nextPage: () => void
}

type IdMap = {
  [key: string]: boolean
}

const useSpeedTestData = (): UseSpeedTestOutput => {
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setSpeedTestData] = useState<SpeedTestData[]>([])

  const load = useCallback(async (pageRequest: number = 1): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${SERVER_URL}/speed-tests?page=${pageRequest}`)
      const jsonData: SpeedTestData[] = await res.json()
      if (jsonData.length) {
        setSpeedTestData(currentData => {
          const ids: IdMap = currentData.reduce((ids, d) => ({ ...ids, [d._id]: true }), {})
          const newData = jsonData.filter(d => !ids[d._id])
          return [...currentData, ...newData]
        })
        setPage(p => p + 1)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const nextPage = useCallback(() => load(page), [page, load])

  return {
    data,
    loading,
    error,
    nextPage
  }
}

export { useSpeedTestData }
