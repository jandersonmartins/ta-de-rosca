interface ScreenshotUpload {
  upload (screenshot: Buffer, name: string): Promise<void>
}

export default ScreenshotUpload
