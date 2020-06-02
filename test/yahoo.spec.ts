import { YahooFinance } from '../src';
import {addDays} from "date-fns";

describe('Yahoo Finance', () => {

    describe('getEarnings', () => {

        it('successfully gets earnings', async () => {
           const earnings = await YahooFinance.getEarnings(addDays(new Date(), 2));
           expect(earnings).toBeDefined();
        });
    });
});
