import ScreenshotUpload from '../../speed-test/services/ScreenshotUpload'

class FakeScreenshotUpload implements ScreenshotUpload {
  async upload (screenshot: Buffer, name: string): Promise<void> {
  }
}

export default FakeScreenshotUpload
