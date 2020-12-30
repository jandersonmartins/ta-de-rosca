import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

import SpeedTestData from './SpeedTestData'

const SERVER_URL = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:4001'

const useSpeedTestData = (): SpeedTestData[] => {
  const [data, setSpeedTestData] = useState<SpeedTestData[]>([])
  useEffect(() => {
    const socket: Socket = io(SERVER_URL)
    socket.on('speed-test-all', (received: SpeedTestData[]) => {
      setSpeedTestData(received)
    })
    socket.emit('speed-test-get-all')
    return () => {
      socket.disconnect()
    }
  }, [])
  return data
}

export { useSpeedTestData }
