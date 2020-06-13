import { format } from 'date-fns';
import * as puppeteer from 'puppeteer';
import { Earning } from './yahoo.types';

const BASE_URL = 'https://finance.yahoo.com';

export class YahooFinance {
  static async getEarnings(date: Date = new Date()): Promise<Earning[]> {
    const reportDate = format(date, 'yyyy-MM-dd');
    const url = `${BASE_URL}/calendar/earnings?day=${format(date, reportDate)}`;
    return this.getEarningsTable(url, reportDate);
  }

  private static async getEarningsTable(url: string, reportDate: string): Promise<Earning[]> {
    const earnings: Earning[] = [];
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    const data = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll('table tr td'));
      return tds.map((td: any) => td.innerText);
    });
    for (let i = 0; i < data.length; i += 6) {
      const epsEstimate = data[i + 3] !== '-' ? Number(data[i + 3]) : undefined;
      const epsReported = data[i + 4] !== '-' ? Number(data[i + 4]) : undefined;
      const epsSurprise = data[i + 5] !== '-' ? Number(data[i + 5]) : undefined;
      earnings.push({
        epsEstimate,
        epsReported,
        epsSurprise,
        reportDate,
        symbol: data[i],
        company: data[i + 1],
        announceTime: data[i + 2],
        epsSurpriseDollar: epsReported && epsEstimate ? Number((epsReported - epsEstimate).toFixed(2)) : undefined
      });
    }
    await browser.close();
    return earnings;
  }
}
