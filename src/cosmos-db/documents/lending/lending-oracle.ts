import { ApiProperty } from '@nestjs/swagger';
import {
  ExchangeSource,
  LendingOracleAssetRefKind,
  LendingOracleProviderKind,
  LendingOracleReadMode,
  LendingOracleStrategy,
  OracleType,
  PricingMethod,
} from '../../../enums/lending.enum';

export class OraclePriceFluctuation {
  @ApiProperty({
    type: 'integer',
    description: 'First upper ratio threshold for price fluctuation',
  })
  firstUpperRatio!: number;

  @ApiProperty({
    type: 'integer',
    description: 'First lower ratio threshold for price fluctuation',
  })
  firstLowerRatio!: number;

  @ApiProperty({
    type: 'integer',
    description: 'Last upper ratio threshold for price fluctuation',
  })
  lastUpperRatio!: number;

  @ApiProperty({
    type: 'integer',
    description: 'Last lower ratio threshold for price fluctuation',
  })
  lastLowerRatio!: number;

  constructor(init?: Partial<OraclePriceFluctuation>) {
    Object.assign(this, init);
  }
}

export class LendingOracleAssetRef {
  @ApiProperty({
    enum: LendingOracleAssetRefKind,
    enumName: 'LendingOracleAssetRefKind',
    description: 'Oracle-native asset reference discriminator',
  })
  kind!: LendingOracleAssetRefKind;

  @ApiProperty({
    type: String,
    description: 'Oracle-native asset reference value',
  })
  value!: string;

  constructor(init?: Partial<LendingOracleAssetRef>) {
    Object.assign(this, init);
  }
}

export class LendingOracleSource {
  @ApiProperty({
    enum: LendingOracleProviderKind,
    enumName: 'LendingOracleProviderKind',
    description: 'Oracle provider used by this source',
  })
  provider!: LendingOracleProviderKind;

  @ApiProperty({
    type: String,
    description: 'Provider contract address',
  })
  contractAddress!: string;

  @ApiProperty({
    type: LendingOracleAssetRef,
    required: false,
    description: 'Provider-specific asset reference',
  })
  asset?: LendingOracleAssetRef;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Provider-specific feed identifier',
  })
  feedId?: string;

  @ApiProperty({
    enum: LendingOracleReadMode,
    enumName: 'LendingOracleReadMode',
    description: 'Read mode used for this source',
  })
  readMode!: LendingOracleReadMode;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Number of records used when readMode is Twap',
  })
  twapRecords?: number;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Provider-reported price decimals',
  })
  decimals?: number;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Provider-reported resolution in seconds',
  })
  resolutionSeconds?: number;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Maximum seconds before this source is considered stale',
  })
  maxStaleSeconds?: number;

  constructor(init?: Partial<LendingOracleSource>) {
    Object.assign(this, init);
    if (init?.asset) {
      this.asset = new LendingOracleAssetRef(init.asset);
    }
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
    description: 'MultiversX oracle contract address',
  })
  oracleContractAddress!: string;

  @ApiProperty({
    enum: PricingMethod,
    enumName: 'PricingMethod',
    description: 'MultiversX pricing method',
  })
  pricingMethod!: PricingMethod;

  @ApiProperty({
    enum: OracleType,
    enumName: 'OracleType',
    description: 'MultiversX oracle type',
  })
  oracleType!: OracleType;

  @ApiProperty({
    enum: ExchangeSource,
    enumName: 'ExchangeSource',
    description: 'MultiversX exchange source',
  })
  exchangeSource!: ExchangeSource;

  @ApiProperty({
    type: 'integer',
    description: 'Number of decimals for the asset',
  })
  assetDecimals!: number;

  @ApiProperty({
    type: 'integer',
    description: 'OneDex pair identifier',
  })
  onedexPairId!: number;

  @ApiProperty({
    type: 'integer',
    description: 'Maximum seconds before price is considered stale',
  })
  maxPriceStaleSeconds!: number;

  constructor(init?: Partial<LendingOracleUpdateStruct>) {
    Object.assign(this, init);
    if (init?.tolerance) {
      this.tolerance = new OraclePriceFluctuation(init.tolerance);
    }
  }
}

export class StellarLendingOracleUpdateStruct {
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
    type: 'integer',
    description: 'Number of decimals for the asset',
  })
  assetDecimals!: number;

  @ApiProperty({
    type: 'integer',
    description: 'Maximum seconds before price is considered stale',
  })
  maxPriceStaleSeconds!: number;

  @ApiProperty({
    enum: LendingOracleStrategy,
    enumName: 'LendingOracleStrategy',
    description: 'Oracle composition strategy',
  })
  strategy!: LendingOracleStrategy;

  @ApiProperty({
    type: LendingOracleSource,
    description: 'Primary oracle source',
  })
  primary!: LendingOracleSource;

  @ApiProperty({
    type: LendingOracleSource,
    required: false,
    description: 'Optional anchor oracle source',
  })
  anchor?: LendingOracleSource;

  constructor(init?: Partial<StellarLendingOracleUpdateStruct>) {
    Object.assign(this, init);
    if (init?.tolerance) {
      this.tolerance = new OraclePriceFluctuation(init.tolerance);
    }
    if (init?.primary) {
      this.primary = new LendingOracleSource(init.primary);
    }
    if (init?.anchor) {
      this.anchor = new LendingOracleSource(init.anchor);
    }
  }
}

export type LendingOracleProvider =
  | LendingOracleUpdateStruct
  | StellarLendingOracleUpdateStruct;
