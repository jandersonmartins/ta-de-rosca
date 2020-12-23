import FormData from 'form-data'

import ScreenshotUpload from '../../../speed-test/services/ScreenshotUpload'

class ScreenshotStorageScreenshotUpload implements ScreenshotUpload {
  async upload (screenshot: Buffer, name: string): Promise<void> {
    const formData = new FormData()

    formData.append('file', screenshot, {
      filename: name
    })

    await new Promise((resolve, reject) => {
      formData.submit(`${process.env.SCREENSHOT_SERVICE}upload`, (err, res) => {
        if (err) return reject(err)
        resolve('')
      })
    })
  }
}

export default ScreenshotStorageScreenshotUpload
