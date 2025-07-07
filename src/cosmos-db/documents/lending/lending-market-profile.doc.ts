import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { LendingDataType } from './lending-data-type.enum';
import { OwnerDto } from '../../../common/owner.dto';
import { LendingEModeCategoryProfileDoc } from './lending-emode-category-profile.doc';
import { createCosmosPaginatedResponse } from '../../cosmos-db-paginated-response.dto';

export class LendingMarketProfileDoc {
  @ApiProperty({
    enum: LendingDataType,
    enumName: 'LendingDataType',
    example: LendingDataType.MARKET_PROFILE,
  })
  dataType!: string;

  @ApiProperty({
    description: 'Token associated with the lending market',
    example: 'EGLD',
  })
  token!: string;

  @ApiProperty({
    description: 'Name of the token',
    example: 'EGLD',
  })
  name!: string;

  @ApiProperty({
    description: 'Number of decimals for the token',
    example: 18,
  })
  decimals!: number;

  @ApiProperty({
    description: 'Address of the lending market',
    example: 'erd1qqqqqqq',
  })
  address!: string;

  @ApiProperty({ description: 'Base interest rate', example: 0.02 })
  baseRate!: string;

  @ApiProperty({ description: 'Maximum borrow rate', example: 0.1 })
  maxBorrowRate!: string;

  @ApiProperty({ description: 'Slope rate 1', example: 0.04 })
  slopeRate1!: string;

  @ApiProperty({ description: 'Slope rate 2', example: 0.08 })
  slopeRate2!: string;

  @ApiProperty({ description: 'Slope rate 3', example: 0.12 })
  slopeRate3!: string;

  @ApiProperty({ description: 'Mid usage rate', example: 0.5 })
  midUsageRate!: string;

  @ApiProperty({ description: 'Optimal usage rate', example: 0.8 })
  optimalUsageRate!: string;

  @ApiProperty({ description: 'Reserve factor', example: 0.1 })
  reserveFactor!: string;

  @ApiProperty({ description: 'Liquidation fee', example: 0.05 })
  liquidationFee!: string;

  @ApiProperty({ description: 'Loan-to-value ratio', example: 0.75 })
  ltv!: string;

  @ApiProperty({ description: 'Liquidation bonus', example: 0.1 })
  liquidationBonus!: string;

  @ApiProperty({ description: 'Liquidation threshold', example: 0.85 })
  liquidationThreshold!: string;

  @ApiProperty({ description: 'Rewards reserves', example: '1000000' })
  rewardsReserve = '0';

  @ApiProperty({ description: 'Rewards reserves (short)', example: 500000 })
  rewardsReserveShort = 0;

  @ApiProperty({ description: 'Reserves', example: '1000000' })
  reserves = '0';

  @ApiProperty({ description: 'Short reserves', example: 500000 })
  reservesShort = 0;

  @ApiProperty({ description: 'Supply amount', example: '2000000' })
  supplyAmount = '0';

  @ApiProperty({ description: 'Supply amount scaled', example: '2000000' })
  supplyAmountScaled = '0';

  @ApiProperty({ description: 'Borrow amount', example: '1500000' })
  borrowAmount = '0';

  @ApiProperty({ description: 'Short supply amount', example: 1000000 })
  supplyAmountShort = 0;

  @ApiProperty({ description: 'Short borrow amount', example: 750000 })
  borrowAmountShort = 0;

  @ApiProperty({ description: 'Borrow amount scaled', example: '1500000' })
  borrowAmountScaled = '0';

  @ApiProperty({ description: 'Supply cap', example: '3000000' })
  supplyCap!: string;

  @ApiProperty({ description: 'Borrow cap', example: '2500000' })
  borrowCap!: string;

  @ApiProperty({ description: 'Short supply cap', example: 1500000 })
  supplyCapShort = 0;

  @ApiProperty({ description: 'Short borrow cap', example: 1250000 })
  borrowCapShort = 0;

  @ApiProperty({ description: 'Supply index', example: '1.02' })
  supplyIndex = '0';

  @ApiProperty({ description: 'Borrow index', example: '1.05' })
  borrowIndex = '0';

  @ApiProperty({
    description: 'Timestamp of last market activity',
    example: 1732650682,
  })
  timestamp = 0;

  @ApiProperty({ description: 'Borrow annual percentage yield', example: 0.05 })
  borrowApy = 0;

  @ApiProperty({ description: 'Supply annual percentage yield', example: 0.03 })
  supplyApy = 0;

  @ApiProperty({ description: 'Utilization rate', example: 0.75 })
  utilizationRate = 0;

  @ApiProperty({
    description: 'Indicates if the asset can be used as collateral',
    example: true,
  })
  canBeCollateral!: boolean;

  @ApiProperty({
    description: 'Indicates if the asset can be borrowed',
    example: true,
  })
  canBeBorrowed!: boolean;

  @ApiProperty({ description: 'Indicates if eMode is enabled', example: false })
  eMode!: boolean;

  @ApiProperty({
    description: 'eMode categories associated with the lending market',
    isArray: true,
    items: { type: 'string' },
    example: ['1', '2'],
  })
  eModeCategories: string[] = [];

  @ApiProperty({
    description: 'Indicates if the asset is isolated',
    example: false,
  })
  isolated!: boolean;

  @ApiProperty({ description: 'Maximum debt in USD', example: '5000000' })
  maxDebtUsd = '0';

  @ApiProperty({ description: 'Maximum debt in USD (short)', example: 2500000 })
  maxDebtUsdShort = 0;

  @ApiProperty({
    description: 'Debt ceiling',
    required: false,
    example: '10000000',
  })
  debtCeiling?: string = '0';

  @ApiProperty({
    description: 'Debt ceiling (short)',
    required: false,
    example: 5000000,
  })
  debtCeilingShort?: number = 0;

  @ApiProperty({
    description: 'Indicates if the asset is siloed',
    example: false,
  })
  siloed!: boolean;

  @ApiProperty({
    description: 'Indicates if flash loans are enabled',
    example: true,
  })
  flashLoan!: boolean;

  @ApiProperty({ description: 'Flash loan fee', example: 0.003 })
  flashLoanFee!: string;

  @ApiProperty({
    description: 'Indicates if the asset can be borrowed in isolation',
    example: false,
  })
  canBorrowInIsolation!: boolean;

  id!: string;
  pk!: string;
  _ts!: number;

  constructor(init?: Partial<LendingMarketProfileDoc>) {
    Object.assign(this, init);
    this.pk = this.dataType;
    this.id = `${this.token}_${this.dataType}`;
  }
}

export class LendingMarketParticipants {
  @ApiProperty({ description: 'Count of participants', example: 100 })
  count!: number;

  @ApiProperty({
    description: 'Wallets of participants',
    isArray: true,
    items: {
      type: 'object',
      $ref: getSchemaPath(OwnerDto),
    },
  })
  wallets!: OwnerDto[];
}

export class MarketExtraApy {
  @ApiProperty({
    description: 'Native APY for derivatives tokes',
    example: 0.03,
    required: false,
  })
  nativeApy?: number;

  @ApiProperty({
    description: 'LP fees APR',
    example: 0.03,
    required: false,
  })
  feesApr?: number;
}

export class LendingMarketProfile extends LendingMarketProfileDoc {
  @ApiProperty({
    description: 'eMode categories associated with the lending market',
    isArray: true,
    items: {
      type: 'object',
      $ref: getSchemaPath(LendingEModeCategoryProfileDoc),
    },
    example: true,
  })
  eModeCategoryProfiles!: LendingEModeCategoryProfileDoc[];

  @ApiProperty({ description: 'Oracle price', example: '100' })
  oraclePrice!: string;

  @ApiProperty({
    description: 'Participants in the lending market',
    type: LendingMarketParticipants,
  })
  participants!: LendingMarketParticipants;

  @ApiProperty({
    description: 'Extra APY for derivatives & LP tokens',
    type: MarketExtraApy,
    required: false,
  })
  extraApy?: MarketExtraApy;
}

export class LendingMarketProfileQuery extends createCosmosPaginatedResponse(
  LendingMarketProfile,
) {}
