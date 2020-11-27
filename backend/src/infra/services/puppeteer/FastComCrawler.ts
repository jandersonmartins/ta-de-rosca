import { join } from 'path'
import puppeteer from 'puppeteer'

import SpeedTestData from '../../../speed-test/dto/SpeedTestData'
import SpeedTestCrawler from '../../../speed-test/services/SpeedTestCrawler'

export interface FastComCrawlerOptions {
  url?: string
  screenShotOutputDir?: string
}

class FastComCrawler implements SpeedTestCrawler {
  private url: string
  private screenShotOutputDir: string | undefined

  constructor ({
    url = 'https://fast.com',
    screenShotOutputDir
  }: FastComCrawlerOptions) {
    this.url = url
    this.screenShotOutputDir = screenShotOutputDir
  }

  async crawl (): Promise<SpeedTestData> {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()

    await page.goto(this.url)

    const result = await this.speedTest(browser, page)

    return result
  }

  private async speedTest (browser: puppeteer.Browser, page: puppeteer.Page): Promise<SpeedTestData> {
    const downloadFinish = await page.$('#speed-value.succeeded')
    const uploadFinish = await page.$('#upload-value.succeeded')
    if (!!downloadFinish && !!uploadFinish) {
      let screenshot: string | null = null
      if (this.screenShotOutputDir) {
        screenshot = `${Date.now()}.png`
        const screenshotPath = join(this.screenShotOutputDir, screenshot)
        await page.click('#show-more-details-link')
        await page.screenshot({ path: screenshotPath, fullPage: true })
      }
      const result = {
        downloadSpeed: await this.getEl(page, '#speed-value'),
        uploadSpeed: await this.getEl(page, '#upload-value'),
        downloadUnit: await this.getEl(page, '#speed-units'),
        uploadUnit: await this.getEl(page, '#upload-units'),
        ip: await this.getEl(page, '#user-ip'),
        ping: await this.getEl(page, '#bufferbloat-value'),
        pingUnit: await this.getEl(page, '#bufferbloat-units'),
        requestLocation: await this.getEl(page, '#user-location'),
        serverLocation: await this.getEl(page, '#server-locations'),
        service: 'fast',
        serviceLocation: 'https://fast.com',
        dateTime: new Date(),
        screenshot
      }

      browser.close()

      return result
    }

    await this.delay()

    return await this.speedTest(browser, page)
  }

  private async delay (): Promise<void> {
    await new Promise(resolve => {
      setTimeout(() => resolve(), 2000)
    })
  }

  private async getEl (page: puppeteer.Page, selector: string): Promise<string | null> {
    const el = await page.$(selector)
    const elValue = await el?.evaluate(e => e.textContent)
    return elValue ?? null
  }
}

export default FastComCrawler