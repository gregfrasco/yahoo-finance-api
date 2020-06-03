import { JSDOM } from 'jsdom';
import { format } from 'date-fns';
import { Earning, AnnounceTime } from './yahoo.types';

const BASE_URL = 'https://finance.yahoo.com';

export class YahooFinance {
  static async getEarnings(date: Date = new Date()): Promise<Earning[]> {
    const reportDate = format(date, 'yyyy-MM-dd');
    const res = await JSDOM.fromURL(`${BASE_URL}/calendar/earnings?day=${format(date, reportDate)}`, {
      runScripts: 'dangerously'
    });
    const earnings: Earning[] = [];
    const table = res.window.document.querySelector('tbody');
    if (!table) {
      return earnings;
    }
    for (let row of table.children) {
      const columns = row.children;
      const epsEstimate = Number(columns[3].textContent) || undefined;
      const epsReported = Number(columns[4].textContent) || undefined;
      const time = columns[2].textContent ? row.children[2].textContent : row.children[2].children[0].textContent;
      earnings.push({
        epsEstimate,
        epsReported,
        reportDate,
        symbol: columns[0].children[0].textContent,
        company: columns[1].textContent,
        announceTime: time as AnnounceTime,
        epsSurprise: row.children[5].children[0].textContent || undefined,
        epsSurpriseDollar: epsReported && epsEstimate ? Number((epsReported - epsEstimate).toFixed(2)) : undefined
      });
    }
    return earnings;
  }
}
