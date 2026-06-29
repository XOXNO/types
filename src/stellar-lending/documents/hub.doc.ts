import { StellarLendingDataType } from '../enums';

export class StellarHubDoc {
  dataType = StellarLendingDataType.HUB;
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
    this.pk = this.dataType;
    this.id = `hub:${this.hubId}`;
  }
}
