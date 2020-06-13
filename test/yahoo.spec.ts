import { AnnounceTime, YahooFinance } from '../src';

describe('Yahoo Finance', () => {
  describe('getEarnings', () => {
    it('successfully gets earnings', async () => {
      const earnings = await YahooFinance.getEarnings(new Date('2020-05-30T23:00:00.000Z'));
      expect(earnings).toBeDefined();
      expect(earnings).toHaveLength(3);
      expect(earnings).toEqual([
        {
          epsEstimate: -0.1,
          epsReported: -0.65,
          epsSurprise: -550,
          reportDate: '2020-05-30',
          symbol: 'LTMAQ',
          company: 'LATAM Airlines Group S.A.',
          announceTime: AnnounceTime.TIME_NOT_SUPPLIED,
          epsSurpriseDollar: -0.55
        },
        {
          epsEstimate: -0.1,
          epsReported: -0.65,
          epsSurprise: -550,
          reportDate: '2020-05-30',
          symbol: 'LTM',
          company: 'LATAM Airlines Group S.A.',
          announceTime: AnnounceTime.TIME_NOT_SUPPLIED,
          epsSurpriseDollar: -0.55
        },
        {
          epsEstimate: 0.17,
          epsReported: 0.28,
          epsSurprise: 64.71,
          reportDate: '2020-05-30',
          symbol: 'CALM',
          company: 'Cal-Maine Foods Inc',
          announceTime: AnnounceTime.TIME_NOT_SUPPLIED,
          epsSurpriseDollar: 0.11
        }
      ]);
    });
  });
});
