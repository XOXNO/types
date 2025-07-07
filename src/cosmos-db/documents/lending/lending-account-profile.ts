import { LendingDataType } from './lending-data-type.enum';

export class LendingAccountProfileDoc {
  dataType: LendingDataType = LendingDataType.ACCOUNT_PROFILE;
  identifier!: string;
  nonce!: number;
  token!: string;
  supplyAmountScaled: string = '0';
  borrowAmountScaled: string = '0';
  supplyIndex: string = '0';
  borrowIndex: string = '0';
  isVault!: boolean;
  entryLiquidationThreshold!: string;
  entryLiquidationBonus!: string;
  entryLiquidationFee!: string;
  entryLtv!: string;
  isolated?: boolean;
  isolatedToken?: string;
  eModeCategory?: string;
  address!: string; // address can change in the scenario of a user transferring their position(NFT) to another address
  id!: string;
  pk!: string;

  constructor(init?: Partial<LendingAccountProfileDoc>) {
    Object.assign(this, init);
    this.pk = this.dataType;
    this.id = `${this.identifier}_${this.token}`;
  }
}

export type LendingAccountProfileDocType = LendingAccountProfileDoc;
