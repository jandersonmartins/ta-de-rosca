interface SpeedTestData {
  _id: string
  downloadSpeed: string | null
  uploadSpeed: string | null
  downloadUnit: string | null
  uploadUnit: string | null
  ip: string | null
  ping: string | null
  pingUnit: string | null
  requestLocation: string | null
  serverLocation: string | null
  service: string | null
  serviceLocation: string | null
  screenshot: string | null
  dateTime: Date | null
}

export default SpeedTestData
