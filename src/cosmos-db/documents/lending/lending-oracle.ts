import { ApiProperty } from '@nestjs/swagger';
import {
  ExchangeSource,
  OracleType,
  PricingMethod,
} from '../../../enums/lending.enum';

export class OraclePriceFluctuation {
  @ApiProperty({
    type: String,
    description: 'First upper ratio threshold for price fluctuation',
  })
  firstUpperRatio!: string;

  @ApiProperty({
    type: String,
    description: 'First lower ratio threshold for price fluctuation',
  })
  firstLowerRatio!: string;

  @ApiProperty({
    type: String,
    description: 'Last upper ratio threshold for price fluctuation',
  })
  lastUpperRatio!: string;

  @ApiProperty({
    type: String,
    description: 'Last lower ratio threshold for price fluctuation',
  })
  lastLowerRatio!: string;

  constructor(init?: Partial<OraclePriceFluctuation>) {
    Object.assign(this, init);
  }
}

export class LendingOracleUpdateStruct {
  @ApiProperty({
    type: String,
    description: 'Base token identifier',
  })
  baseTokenId!: string;

  @ApiProperty({
    type: String,
    description: 'Quote token identifier',
  })
  quoteTokenId!: string;

  @ApiProperty({
    type: OraclePriceFluctuation,
    description: 'Price fluctuation tolerance thresholds',
  })
  tolerance!: OraclePriceFluctuation;

  @ApiProperty({
    type: String,
    description: 'Oracle contract address',
  })
  oracleContractAddress!: string;

  @ApiProperty({
    enum: PricingMethod,
    enumName: 'PricingMethod',
    description: 'Method used for pricing',
  })
  pricingMethod!: PricingMethod;

  @ApiProperty({
    enum: OracleType,
    enumName: 'OracleType',
    description: 'Type of oracle',
  })
  oracleType!: OracleType;

  @ApiProperty({
    enum: ExchangeSource,
    enumName: 'ExchangeSource',
    description: 'Source exchange for price data',
  })
  exchangeSource!: ExchangeSource;

  @ApiProperty({
    type: Number,
    description: 'Number of decimals for the asset',
  })
  assetDecimals!: number;

  @ApiProperty({
    type: Number,
    description: 'OneDex pair identifier',
  })
  onedexPairId!: number;

  @ApiProperty({
    type: Number,
    description: 'Maximum seconds before price is considered stale',
  })
  maxPriceStaleSeconds!: number;

  constructor(init?: Partial<LendingOracleUpdateStruct>) {
    Object.assign(this, init);
  }
}
