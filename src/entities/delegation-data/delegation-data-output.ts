export class UndelegateInfo {
  id!: string;
  value!: string;
  timestamp!: number;
  valueShort!: number;
}

export class DelegationDataOutput {
  address!: string;
  contract!: string;
  activeStake!: string; // Assuming activeStake is a string, adjust the type if it's different
  activeStakeShort!: number;
  unDelegateInfo!: UndelegateInfo; // Replace 'any' with the appropriate type if known
  claimableRewards!: number; // Assuming claimableRewards is a number, adjust the type if it's different
  claimableRewardsShort!: number; // Assuming claimableRewardsShort is a string, adjust the type if it's different
  totalUnbondEligible!: string;
}
