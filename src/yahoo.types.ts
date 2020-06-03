export interface Earning {
  symbol: string;
  company: string;
  announceTime: AnnounceTime;
  epsEstimate?: number;
  epsReported?: number;
  epsSurpriseDollar?: number;
  epsSurprise?: number;
  reportDate?: string;
}

export enum AnnounceTime {
  TIME_NOT_SUPPLIED = 'Time Not Supplied',
  TAS = 'TAS',
  AMC = 'After Market Close',
  BMO = 'Before Market Open'
}
