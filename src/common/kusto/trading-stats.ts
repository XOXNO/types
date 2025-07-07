export class TradingStatistics {
  totalVolume = 0;
  totalTrades = 0;
  averagePrice?: number = 0;
  allTimeHigh: {
    price: number;
    timestamp: number;
    txHash: string;
    identifier: string;
  } = {
    price: 0,
    timestamp: 0,
    txHash: '',
    identifier: '',
  };
  day: TradingDataSummary = new TradingDataSummary();
  week: TradingDataSummary = new TradingDataSummary();
  month: TradingDataSummary = new TradingDataSummary();
  quarter: TradingDataSummary = new TradingDataSummary();
  halfYear: TradingDataSummary = new TradingDataSummary();
  year: TradingDataSummary = new TradingDataSummary();

  constructor(props?: Partial<TradingStatistics>) {
    Object.assign(this, props);
  }
}

class TradingDataSummary {
  volume = 0;
  volumeMargin = 0;
  trades = 0;
  tradesMargin = 0;
  minPrice?: number = 0;
  maxPrice?: number = 0;
  averagePrice?: number = 0;
}
