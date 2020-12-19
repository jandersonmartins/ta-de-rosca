import puppeteer from 'puppeteer'

import SpeedTestCrawler, { CrawlOutput } from '../../../speed-test/services/SpeedTestCrawler'

export interface FastComCrawlerOptions {
  url?: string
}

class FastComCrawler implements SpeedTestCrawler {
  private url: string

  constructor ({
    url = 'https://fast.com'
  }: FastComCrawlerOptions = {}) {
    this.url = url
  }

  async crawl (): Promise<CrawlOutput> {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()

    await page.goto(this.url)

    const result = await this.speedTest(browser, page)

    return result
  }

  private async speedTest (browser: puppeteer.Browser, page: puppeteer.Page): Promise<CrawlOutput> {
    await page.waitForSelector('#speed-value.succeeded', { timeout: 0 })
    await page.waitForSelector('#upload-value.succeeded', { timeout: 0 })

    const screenshot = `${Date.now()}.png`
    await page.click('#show-more-details-link')
    const buffer = await page.screenshot({ fullPage: true })

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

    return { screenshot: buffer, speedTestData: result }
  }

  private async getEl (page: puppeteer.Page, selector: string): Promise<string | null> {
    const el = await page.$(selector)
    const elValue = await el?.evaluate(e => e.textContent)
    return elValue ?? null
  }
}

export default FastComCrawler
