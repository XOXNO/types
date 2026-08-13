import { StellarLendingDataType } from '../enums';
import { stellarLendingPartitionKey } from '../network';
import type { StellarNetwork } from '../network';

export class StellarSpokeDoc {
  dataType = StellarLendingDataType.SPOKE;
  network!: StellarNetwork;
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
    this.pk = stellarLendingPartitionKey(this.network, this.dataType);
    this.id = `spoke:${this.spokeId}`;
  }
}
