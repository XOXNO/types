import { LendingDataType } from './lending-data-type.enum';

export class LendingMarketProfileDoc {
  dataType: string = LendingDataType.MARKET_PROFILE;
  token!: string;
  name!: string;
  decimals!: number;
  address!: string;
  baseRate!: string;
  maxBorrowRate!: string;
  slopeRate1!: string;
  slopeRate2!: string;
  slopeRate3!: string;
  optimalUsageRate!: string;
  midUsageRate!: string;
  reserveFactor!: string;
  liquidationFee!: string;
  ltv!: string;
  liquidationBonus!: string;
  liquidationThreshold!: string;
  reserves: string = '0';
  reservesShort: number = 0;
  supplyAmountScaled: string = '0';
  borrowAmountScaled: string = '0';
  supplyCap: string = '0';
  borrowCap: string = '0';
  supplyCapShort: number = 0;
  borrowCapShort: number = 0;
  supplyIndex: string = '0';
  supplyIndexShort: number = 0;
  borrowIndex: string = '0';
  borrowIndexShort: number = 0;
  timestamp: number = 0;
  borrowApy: number = 0;
  supplyApy: number = 0;
  utilizationRate: number = 0;
  canBeCollateral!: boolean;
  canBeBorrowed!: boolean;
  eMode!: boolean;
  eModeCategories: string[] = [];
  isolated!: boolean;
  maxDebtUsd: string = '0';
  maxDebtUsdShort: number = 0;
  debtCeiling?: string = '0';
  debtCeilingShort?: number = 0;
  rewardsReserveScaled = '0';
  siloed!: boolean;
  flashLoan!: boolean;
  flashLoanFee!: string;
  canBorrowInIsolation!: boolean;
  id!: string;
  pk!: string;

  constructor(init?: Partial<LendingMarketProfileDoc>) {
    Object.assign(this, init);
    this.pk = this.dataType;
    this.id = `${this.token}_${this.dataType}`;
  }
}

export type LendingMarketProfileDocType = LendingMarketProfileDoc;
