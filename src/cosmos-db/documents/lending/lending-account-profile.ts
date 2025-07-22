import { ApiProperty, PickType } from '@nestjs/swagger';

import { LendingDataType } from '../../../enums/lending-data-type.enum';
import { LendingEModeCategoryProfileDoc } from './lending-emode-category-profile.doc';
import { LendingMarketProfile } from './lending-market-profile.doc';
import { PositionMode } from '../../../enums/lending.enum';

export class LendingAccountProfileDoc {
  @ApiProperty({
    enum: LendingDataType,
    enumName: 'LendingDataType',
    example: LendingDataType.ACCOUNT_PROFILE,
  })
  dataType = LendingDataType.ACCOUNT_PROFILE;

  @ApiProperty({
    description: 'Unique identifier for the lending account',
    example: 'account123',
  })
  identifier!: string;

  @ApiProperty({
    description: 'A unique number to ensure uniqueness of the identifier',
    example: 1,
  })
  nonce!: number;

  @ApiProperty({
    description: 'The token associated with the lending account',
    example: 'EGLD',
  })
  token!: string;

  @ApiProperty({
    description: 'The amount supplied in the lending account',
    example: '1000',
  })
  supplyAmountScaled = '0';

  @ApiProperty({
    description: 'The amount borrowed from the lending account',
    example: '500',
  })
  borrowAmountScaled = '0';

  @ApiProperty({
    description: 'Supply index',
    example: 0,
  })
  supplyIndex = 0;

  @ApiProperty({
    description: 'Borrow index',
    example: 0,
  })
  borrowIndex = 0;

  @ApiProperty({
    description: 'Entry liquidation threshold',
    example: '780000000000000000000',
  })
  entryLiquidationThreshold!: string;

  @ApiProperty({
    description: 'Entry liquidation bonus',
    example: '800000000000000000000',
  })
  entryLiquidationBonus!: string;

  @ApiProperty({
    description: 'Entry liquidation fee',
    example: '100000000000000000000',
  })
  entryLiquidationFee!: string;

  @ApiProperty({
    description: 'Entry loan to value',
    example: '650000000000000000000',
  })
  entryLtv!: string;

  @ApiProperty({
    description: 'Indicates if the asset is isolated',
    example: false,
    required: false,
  })
  isolated?: boolean;

  @ApiProperty({
    description: 'Position mode',
    example: PositionMode.Normal,
    enum: PositionMode,
    enumName: 'PositionMode',
  })
  positionMode!: PositionMode;

  @ApiProperty({
    description: 'eMode category',
    example: '1',
    required: false,
  })
  eModeCategory?: string;

  @ApiProperty({
    description: 'Address of the lending account',
    example: 'erd123',
  })
  address!: string;

  @ApiProperty({
    description: 'Initial strategy values',
    example: {
      leverageInitialSupply: '1000',
      leverageInitialSupplyPrice: '1000',
    },
    required: false,
  })
  leverageInitialSupply?: number;

  @ApiProperty({
    description: 'Initial strategy values',
    example: {
      leverageInitialSupply: '1000',
      leverageInitialSupplyPrice: '1000',
    },
    required: false,
  })
  leverageInitialSupplyPrice?: number;

  @ApiProperty({
    description: 'Initial strategy values',
    example: {
      leverageInitialBorrow: '1000',
      leverageInitialBorrowPrice: '1000',
    },
    required: false,
  })
  leverageInitialBorrow?: number;

  @ApiProperty({
    description: 'Initial strategy values',
    example: {
      leverageInitialBorrow: '1000',
      leverageInitialBorrowPrice: '1000',
    },
    required: false,
  })
  leverageInitialBorrowPrice?: number;

  id!: string;
  pk!: string;
  _ts!: number;

  constructor(props?: Partial<LendingAccountProfileDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `${this.identifier}_${this.token}`;
  }
}

const selectFields = [
  'token',
  'name',
  'supplyApy',
  'borrowApy',
  'decimals',
  'reserves',
  'supplyCap',
  'borrowCap',
  'supplyAmount',
  'supplyAmountScaled',
  'borrowAmountScaled',
  'ltv',
  'liquidationThreshold',
  'liquidationBonus',
  'liquidationFee',
  'siloed',
  'supplyIndex',
  'borrowIndex',
  'rewardsReserve',
  'maxDebtUsd',
  'debtCeiling',
  'isolated',
  'canBeCollateral',
  'timestamp',
  'canBeBorrowed',
  'canBorrowInIsolation',
  'extraApy',
  'flashLoanFee',
  'utilizationRate',
  'borrowAmount',
  'optimalUsageRate',
  'slopeRate1',
  'slopeRate2',
  'slopeRate3',
  'midUsageRate',
  'baseRate',
  'maxBorrowRate',
  'reserveFactor',
  'oraclePrice',
  'address',
  'flashLoan',
] as const;

export class LendingAccountProfile extends LendingAccountProfileDoc {
  @ApiProperty({
    description: 'The amount supplied in the lending account',
    example: '1000',
  })
  supplyAmount!: string;

  @ApiProperty({
    description: 'The amount borrowed from the lending account',
    example: '500',
  })
  borrowAmount!: string;

  @ApiProperty({
    description: 'EMode profile',
    required: false,
  })
  eModeCategoryProfile?: LendingEModeCategoryProfileDoc;

  @ApiProperty({
    description: 'Lending market partial profile',
    // type: PickType(LendingMarketProfile, selectFields),
  })
  marketProfile!: Pick<LendingMarketProfile, (typeof selectFields)[number]>;
}
