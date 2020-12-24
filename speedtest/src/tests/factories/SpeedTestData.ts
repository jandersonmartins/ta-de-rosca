import SpeedTestData from '../../speed-test/dto/SpeedTestData'

export const speedTestDataFactory = (): SpeedTestData => {
  return {
    downloadSpeed: '30',
    uploadSpeed: '10',
    downloadUnit: 'mb',
    uploadUnit: 'mb',
    ip: '45.178.202.15',
    ping: '12',
    pingUnit: 'ms',
    requestLocation: 'Maceio, BR',
    serverLocation: 'Maceio, BR',
    service: 'fast',
    serviceLocation: 'https://fast.com',
    screenshot: 'me.jpg',
    dateTime: new Date()
  }
}
