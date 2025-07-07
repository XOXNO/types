import { ActivityChain } from '../../../common/enums';
import { CollectionDataType } from './dataTypes';
import { CollectionProfileDocType } from './profile';

export class CollectionStatsDoc {
  dataType: string = CollectionDataType.CollectionStats;
  collection!: string;
  floorPrice?: number = 0;
  listedCount: number = 0;
  tradingStats: TradingStatistics = new TradingStatistics();
  chain: ActivityChain = ActivityChain.MULTIVERSX;
  _ts!: number;
  id!: string;
  // applied after db call
  collectionInfo?: Partial<CollectionProfileDocType>;

  constructor(props?: Partial<CollectionStatsDoc>) {
    if (!props?.collection) {
      throw new Error('collection is required');
    }
    Object.assign(this, props);
    this.collection = this.collection.replace(/::/g, '-');
    this.id = `${this.collection}-${this.dataType}`;
  }
}

export class TradingStatistics {
  totalVolume: number = 0;
  totalTrades: number = 0;
  averagePrice?: number = 0;
  allTimeHigh: AllTimeHigh = new AllTimeHigh();
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
  volume: number = 0;
  volumeMargin: number = 0;
  trades: number = 0;
  tradesMargin: number = 0;
  minPrice?: number = 0;
  maxPrice?: number = 0;
  averagePrice?: number = 0;
}

export class AllTimeHigh {
  price: number = 0;
  timestamp: number = 0;
  txHash: string = '';
  identifier: string = '';

  constructor(props?: Partial<AllTimeHigh>) {
    Object.assign(this, props);
  }
}

export type CollectionStatsDocType = CollectionStatsDoc;
