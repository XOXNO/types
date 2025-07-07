import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ActivityChain } from '../../../common/enums';
import { CollectionDataType } from './dataTypes';
import { CollectionProfileDoc } from './profile';

class TradingDataSummary {
  @ApiProperty({
    description: 'Trading volume',
    example: 100.5,
  })
  volume: number = 0;

  @ApiProperty({
    description: 'Volume margin percentage',
    example: 5.2,
  })
  volumeMargin: number = 0;

  @ApiProperty({
    description: 'Number of trades',
    example: 10,
  })
  trades: number = 0;

  @ApiProperty({
    description: 'Trades margin percentage',
    example: 3.1,
  })
  tradesMargin: number = 0;

  @ApiProperty({
    description: 'Minimum price',
    required: false,
    example: 0.1,
  })
  minPrice?: number = 0;

  @ApiProperty({
    description: 'Maximum price',
    required: false,
    example: 100.0,
  })
  maxPrice?: number = 0;

  @ApiProperty({
    description: 'Average price',
    required: false,
    example: 20.5,
  })
  averagePrice?: number = 0;
}

export class AllTimeHigh {
  @ApiProperty({
    description: 'All-time high price',
    example: 150.0,
  })
  price: number = 0;

  @ApiProperty({
    description: 'Timestamp of all-time high',
    example: 1640995200,
  })
  timestamp: number = 0;

  @ApiProperty({
    description: 'Transaction hash of all-time high',
    example: '0x123abc...',
  })
  txHash: string = '';

  @ApiProperty({
    description: 'NFT identifier of all-time high',
    example: 'COLLECTION-123456-01',
  })
  identifier: string = '';

  constructor(props?: Partial<AllTimeHigh>) {
    Object.assign(this, props);
  }
}

export class TradingStatistics {
  @ApiProperty({
    description: 'Total volume traded',
    example: 1000.5,
  })
  totalVolume: number = 0;

  @ApiProperty({
    description: 'Total number of trades',
    example: 50,
  })
  totalTrades: number = 0;

  @ApiProperty({
    description: 'Average price of trades',
    required: false,
    example: 20.1,
  })
  averagePrice?: number = 0;

  @ApiProperty({
    description: 'All-time high statistics',
    type: AllTimeHigh,
  })
  allTimeHigh: AllTimeHigh = new AllTimeHigh();

  @ApiProperty({
    description: 'Daily trading statistics',
    type: TradingDataSummary,
  })
  day: TradingDataSummary = new TradingDataSummary();

  @ApiProperty({
    description: 'Weekly trading statistics',
    type: TradingDataSummary,
  })
  week: TradingDataSummary = new TradingDataSummary();

  @ApiProperty({
    description: 'Monthly trading statistics',
    type: TradingDataSummary,
  })
  month: TradingDataSummary = new TradingDataSummary();

  @ApiProperty({
    description: 'Quarterly trading statistics',
    type: TradingDataSummary,
  })
  quarter: TradingDataSummary = new TradingDataSummary();

  @ApiProperty({
    description: 'Half-year trading statistics',
    type: TradingDataSummary,
  })
  halfYear: TradingDataSummary = new TradingDataSummary();

  @ApiProperty({
    description: 'Yearly trading statistics',
    type: TradingDataSummary,
  })
  year: TradingDataSummary = new TradingDataSummary();

  constructor(props?: Partial<TradingStatistics>) {
    Object.assign(this, props);
  }
}

export class CollectionStatsDoc {
  @ApiProperty({
    description: 'Data type identifier for collection stats',
    example: CollectionDataType.CollectionStats,
  })
  dataType: string = CollectionDataType.CollectionStats;

  @ApiProperty({
    description: 'Collection identifier',
    example: 'COLLECTION-123456',
  })
  collection!: string;

  @ApiProperty({
    description: 'Floor price of the collection',
    required: false,
    example: 0.5,
  })
  floorPrice?: number = 0;

  @ApiProperty({
    description: 'Number of listed items',
    example: 100,
  })
  listedCount: number = 0;

  @ApiProperty({
    description: 'Trading statistics for the collection',
    type: TradingStatistics,
  })
  tradingStats: TradingStatistics = new TradingStatistics();

  @ApiProperty({
    description: 'Blockchain chain',
    enum: ActivityChain,
    example: ActivityChain.MULTIVERSX,
  })
  chain: ActivityChain = ActivityChain.MULTIVERSX;

  @ApiProperty({
    description: 'Document timestamp',
    example: 1640995200,
  })
  _ts!: number;

  @ApiProperty({
    description: 'Unique document identifier',
    example: 'COLLECTION-123456-CollectionStats',
  })
  id!: string;

  @ApiProperty({
    description: 'Collection profile information',
    required: false,
    type: PartialType(CollectionProfileDoc),
  })
  collectionInfo?: Partial<CollectionProfileDoc>;

  constructor(props?: Partial<CollectionStatsDoc>) {
    if (!props?.collection) {
      throw new Error('collection is required');
    }
    Object.assign(this, props);
    this.collection = this.collection.replace(/::/g, '-');
    this.id = `${this.collection}-${this.dataType}`;
  }
}

export type CollectionStatsDocType = CollectionStatsDoc;
