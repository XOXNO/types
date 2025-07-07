import { StakingDataType } from './staking-data-type.enum';
import { XoxnoStakingRewardClaim } from './staking-pool-doc';

export class StakingDelegatorDoc {
  dataType: StakingDataType = StakingDataType.Delegator;
  address!: string;
  poolId!: number;
  lastActionEpoch: number = -1; // -1 means no claim yet
  stakedCount!: number;
  unboundCount: number = 0;
  collection!: string[];
  claimedRewards!: XoxnoStakingRewardClaim[];
  id?: string;
  pk?: string;

  constructor(props?: Partial<StakingDelegatorDoc>) {
    Object.assign(this, props);
    this.id = `${this.address}-${this.dataType}-${this.poolId}`;
    this.pk = `${this.address}`;
  }
}
