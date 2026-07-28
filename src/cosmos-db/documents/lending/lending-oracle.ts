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
    description: 'Upper ratio threshold for the primary/anchor price band',
  })
  upperRatio!: number;

  @ApiProperty({
    type: 'integer',
    description: 'Lower ratio threshold for the primary/anchor price band',
  })
  lowerRatio!: number;

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

/**
 * API / swagger projection of on-chain `AssetOracle` for Stellar
 * `config:asset_oracle`. Sources are opaque JSON objects matching
 * {@link import('../../../stellar-lending/oracle-provider').StellarPriceSource}
 * so swagger stays stable without nesting every provider variant.
 */
export class StellarLendingOracleUpdateStruct {
  @ApiProperty({
    type: 'integer',
    description:
      'Token decimals (0 for PriceKey::Ref). Matches on-chain asset_decimals.',
  })
  assetDecimals!: number;

  @ApiProperty({
    type: 'integer',
    description: 'Asset-level staleness ceiling in seconds',
  })
  maxPriceStaleSeconds!: number;

  @ApiProperty({
    type: 'array',
    items: { type: 'object', additionalProperties: true },
    description:
      'One or two PriceSource variants (Feed / Scaled / LpShare) as decoded from chain',
  })
  sources!: Record<string, unknown>[];

  @ApiProperty({
    type: OraclePriceFluctuation,
    description: 'Dual-source agreement band (BPS); ignored for single source',
  })
  tolerance!: OraclePriceFluctuation;

  @ApiProperty({
    description:
      'Independence policy: string "RequireDisjoint" or object AllowShared domains',
  })
  independence!: string | Record<string, unknown>;

  @ApiProperty({
    type: String,
    description: 'Inclusive lower sanity bound, USD WAD decimal string',
  })
  minSanityPriceWad!: string;

  @ApiProperty({
    type: String,
    description: 'Inclusive upper sanity bound, USD WAD decimal string',
  })
  maxSanityPriceWad!: string;

  constructor(init?: Partial<StellarLendingOracleUpdateStruct>) {
    Object.assign(this, init);
    if (init?.tolerance) {
      this.tolerance = new OraclePriceFluctuation(init.tolerance);
    }
  }
}

export type LendingOracleProvider =
  | LendingOracleUpdateStruct
  | StellarLendingOracleUpdateStruct;
