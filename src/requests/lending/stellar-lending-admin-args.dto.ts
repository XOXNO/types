import { ApiProperty } from '@nestjs/swagger';
import {
  LendingOracleProviderKind,
  LendingOracleReadMode,
  LendingOracleStrategy,
} from '../../enums/lending.enum';
import { LendingOracleAssetRef } from '../../cosmos-db/documents/lending/lending-oracle';

/**
 * Admin/config argument DTOs for the Stellar lending controller.
 *
 * RAY/WAD integers cross as decimal strings; bps and counts are numbers;
 * addresses and feed ids are strings.
 */

export class InterestRateModelDto {
  @ApiProperty({
    description: 'Max borrow rate, RAY (1e27) decimal string',
    example: '2000000000000000000000000000',
  })
  maxBorrowRateRay!: string;

  @ApiProperty({
    description: 'Base borrow rate, RAY decimal string',
    example: '10000000000000000000000000',
  })
  baseBorrowRateRay!: string;

  @ApiProperty({ description: 'Slope 1, RAY decimal string' })
  slope1Ray!: string;

  @ApiProperty({ description: 'Slope 2, RAY decimal string' })
  slope2Ray!: string;

  @ApiProperty({ description: 'Slope 3, RAY decimal string' })
  slope3Ray!: string;

  @ApiProperty({ description: 'Mid utilization, RAY decimal string' })
  midUtilizationRay!: string;

  @ApiProperty({ description: 'Optimal utilization, RAY decimal string' })
  optimalUtilizationRay!: string;

  @ApiProperty({ description: 'Max utilization, RAY decimal string' })
  maxUtilizationRay!: string;

  @ApiProperty({ type: 'integer', description: 'Reserve factor, bps' })
  reserveFactorBps!: number;
}

/**
 * Interest rate model plus the pool asset identity.
 */
export class MarketParamsRawDto extends InterestRateModelDto {
  @ApiProperty({ type: String, description: 'Pool asset address' })
  assetId!: string;

  @ApiProperty({
    type: 'integer',
    description: 'SAC token decimal count used for conversions',
  })
  assetDecimals!: number;
}

export class AssetConfigRawDto {
  @ApiProperty({ type: 'integer', description: 'Loan-to-value, bps' })
  loanToValueBps!: number;

  @ApiProperty({ type: 'integer', description: 'Liquidation threshold, bps' })
  liquidationThresholdBps!: number;

  @ApiProperty({ type: 'integer', description: 'Liquidation bonus, bps' })
  liquidationBonusBps!: number;

  @ApiProperty({ type: 'integer', description: 'Liquidation fees, bps' })
  liquidationFeesBps!: number;

  @ApiProperty({ description: 'Whether the asset can be used as collateral' })
  isCollateralizable!: boolean;

  @ApiProperty({ description: 'Whether the asset can be borrowed' })
  isBorrowable!: boolean;

  @ApiProperty({ description: 'Whether the asset can be flash-loaned' })
  isFlashloanable!: boolean;

  @ApiProperty({ type: 'integer', description: 'Flash-loan fee, bps' })
  flashloanFeeBps!: number;

  @ApiProperty({
    description: 'Borrow cap, asset units decimal string (0 = uncapped)',
  })
  borrowCap!: string;

  @ApiProperty({
    description: 'Supply cap, asset units decimal string (0 = uncapped)',
  })
  supplyCap!: string;

  @ApiProperty({
    type: 'integer',
    isArray: true,
    description: 'E-mode category ids this asset participates in',
  })
  eModeCategories!: number[];
}

export class PositionLimitsDto {
  @ApiProperty({
    type: 'integer',
    description: 'Max borrow positions per account',
  })
  maxBorrowPositions!: number;

  @ApiProperty({
    type: 'integer',
    description: 'Max supply positions per account',
  })
  maxSupplyPositions!: number;
}

export class EModeCategoryArgsDto {
  @ApiProperty({ type: 'integer', description: 'Loan-to-value, bps' })
  ltv!: number;

  @ApiProperty({ type: 'integer', description: 'Liquidation threshold, bps' })
  threshold!: number;

  @ApiProperty({ type: 'integer', description: 'Liquidation bonus, bps' })
  bonus!: number;
}

export class OracleSourceConfigInputDto {
  @ApiProperty({
    enum: LendingOracleProviderKind,
    enumName: 'LendingOracleProviderKind',
    description: 'Oracle provider for this source',
  })
  provider!: LendingOracleProviderKind;

  @ApiProperty({ type: String, description: 'Provider contract address' })
  contract!: string;

  @ApiProperty({
    type: LendingOracleAssetRef,
    required: false,
    description:
      'Reflector asset reference (Stellar address / Symbol). Omit for RedStone.',
  })
  asset?: LendingOracleAssetRef;

  @ApiProperty({
    type: String,
    required: false,
    description: 'RedStone feed id. Omit for Reflector.',
  })
  feedId?: string;

  @ApiProperty({
    enum: LendingOracleReadMode,
    enumName: 'LendingOracleReadMode',
    description: 'Read mode (Reflector Spot/Twap; RedStone is always Spot)',
  })
  readMode!: LendingOracleReadMode;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Records when readMode is Twap',
  })
  twapRecords?: number;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Per-source max stale seconds (RedStone)',
  })
  maxStaleSeconds?: number;
}

export class MarketOracleConfigInputDto {
  @ApiProperty({
    type: 'integer',
    description: 'Default max price stale seconds [60, 86400]',
  })
  maxPriceStaleSeconds!: number;

  @ApiProperty({
    type: 'integer',
    description: 'First (tight) tolerance band, bps',
  })
  firstToleranceBps!: number;

  @ApiProperty({
    type: 'integer',
    description: 'Last (wide) tolerance band, bps',
  })
  lastToleranceBps!: number;

  @ApiProperty({
    enum: LendingOracleStrategy,
    enumName: 'LendingOracleStrategy',
    description: 'Single or PrimaryWithAnchor',
  })
  strategy!: LendingOracleStrategy;

  @ApiProperty({
    type: OracleSourceConfigInputDto,
    description: 'Primary source',
  })
  primary!: OracleSourceConfigInputDto;

  @ApiProperty({
    type: OracleSourceConfigInputDto,
    required: false,
    description:
      'Anchor source (required for PrimaryWithAnchor; must cross providers in production)',
  })
  anchor?: OracleSourceConfigInputDto;

  @ApiProperty({
    description: 'Inclusive lower sanity bound, USD WAD decimal string',
  })
  minSanityPriceWad!: string;

  @ApiProperty({
    description: 'Inclusive upper sanity bound, USD WAD decimal string',
  })
  maxSanityPriceWad!: string;
}
