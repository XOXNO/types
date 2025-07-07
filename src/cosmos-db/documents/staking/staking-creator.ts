import { StakingDataType } from './staking-data-type.enum';

export class StakingCreatorDoc {
  dataType: StakingDataType = StakingDataType.Creator;
  address!: string;
  ownedPools!: number[];
  ownedCollections!: string[];
  cutFee!: number;
  id?: string;
  pk?: string;

  constructor(props?: Partial<StakingCreatorDoc>) {
    Object.assign(this, props);
    this.id = `${this.address}-${this.dataType}`;
    this.pk = `${this.address}`;
  }
}
