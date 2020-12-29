import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

import SpeedTestData from './SpeedTestData'

const useSpeedTestData = (): SpeedTestData[] => {
  const [data, setSpeedTestData] = useState<SpeedTestData[]>([])
  useEffect(() => {
    // TODO: receive url from environment variable
    const socket: Socket = io('http://localhost:4001')
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
