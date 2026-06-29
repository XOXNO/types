import { StellarLendingDataType } from '../enums';

export class StellarSpokeDoc {
  dataType = StellarLendingDataType.SPOKE;
  spokeId!: number;
  isDeprecated = false;
  name: string | null = null;
  liquidationTargetHfWad = '0';
  healthFactorForMaxBonusWad = '0';
  liquidationBonusFactorBps = 0;
  assetCount = 0;
  connectedHubIds: number[] = [];
  updatedAt = 0;
  ledger = 0;
  id!: string;
  pk!: string;
  _ts?: number;

  constructor(props?: Partial<StellarSpokeDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `spoke:${this.spokeId}`;
  }
}
