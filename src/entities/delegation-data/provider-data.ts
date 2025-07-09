export interface ProviderData {
  numNodes: number;
  stake: string;
  topUp: string;
  locked: string;
  provider: string;
  owner: string;
  featured: boolean;
  serviceFee: number;
  delegationCap: string;
  apr: number;
  numUsers: number;
  cumulatedRewards: string;
  identity?: string;
  automaticActivation: boolean;
  checkCapOnRedelegate: boolean;
  githubProfileValidated?: boolean;
  githubKeysValidated?: boolean;
  identityInfo?: IdentityInfo;
}

export interface IdentityInfo {
  identity: string;
  locked: string;
  distribution: { [key: string]: number };
  avatar: string;
  name: string;
  score: number;
  validators: number;
  stake: string;
  topUp: string;
  providers: string[];
  stakePercent: number;
  apr: number;
  rank: number;
}
