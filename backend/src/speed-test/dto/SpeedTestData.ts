interface SpeedTestData {
  uuid?: string
  downloadSpeed: number
  uploadSpeed: number
  downloadUnit: string
  uploadUnit: string
  ip: string
  ping: number
  pingUnit: string
  requestLocation: string
  serverLocation: string
  service: string
  serviceLocation: string
  dateTime: Date
}

export default SpeedTestData
