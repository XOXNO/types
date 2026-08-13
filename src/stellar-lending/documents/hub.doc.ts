import { StellarLendingDataType } from '../enums';
import { stellarLendingPartitionKey } from '../network';
import type { StellarNetwork } from '../network';

export class StellarHubDoc {
  dataType = StellarLendingDataType.HUB;
  network!: StellarNetwork;
  hubId!: number;
  isActive = true;
  name: string | null = null;
  assetCount = 0;
  updatedAt = 0;
  ledger = 0;
  id!: string;
  pk!: string;
  _ts?: number;

  constructor(props?: Partial<StellarHubDoc>) {
    Object.assign(this, props);
    this.pk = stellarLendingPartitionKey(this.network, this.dataType);
    this.id = `hub:${this.hubId}`;
  }
}
