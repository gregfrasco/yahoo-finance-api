# yahoo-finance-api
[![npm version](https://img.shields.io/npm/v/yahoo-finance-api.svg?style=flat-square)](https://www.npmjs.org/package/yahoo-finance-api)
[![npm downloads](https://img.shields.io/npm/dm/yahoo-finance-api.svg?style=flat-square)](http://npm-stat.com/charts.html?package=yahoo-finance-api)

Scrapes yahoo finance earnings calendar from a given date.

## Installation

```
npm install yahoo-finance-api
```

```
yarn install yahoo-finance-api
```
    
## Usage

```ts
import { YahooFinance } from 'yahoo-finance-api';

const earnings = await YahooFinance.getEarnings(new Date('2020-06-16')); // default new Date()
console.log(earnings);
// Upcoming Earning
[{ 
    epsEstimate: 1.17,
    epsReported: undefined,
    epsSurprise: undefined,
    reportDate: '2020-06-16',
    symbol: 'ORCL',
    company: 'Oracle Corp',
    announceTime: 'After Market Close',
    epsSurpriseDollar: undefined
}]
// Previous Earning
[{
    epsEstimate: 2.33,
    epsReported: 2.45,
    epsSurprise: 5.15,
    reportDate: '2020-06-11',
    symbol: 'ADBE',
    company: 'Adobe Inc.',
    announceTime: 'Time Not Supplied',
    epsSurpriseDollar: 0.12
}]
```

## License
[MIT](https://github.com/gregfrasco/yahoo-finance-api/blob/master/LICENSE)
