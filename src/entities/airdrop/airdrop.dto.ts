import { ActivityChain } from '../../common/enums';

export type IAirdropRaw = {
  wallet: string;
  tokenAllocation: number;
  totalScore: number;
  rank: number;
  isClaimed?: boolean;
  signature?: {
    signature: string;
    data: string;
  };
  amount?: string;
};

export interface Wallet {
  address: string;
  addressTrimmed: string;
  profile: string;
  username: string;
  isVerified: boolean;
  chain?: ActivityChain;
}

export type IAirdrop = {
  wallet: Wallet;
  tokenAllocation: number;
  totalScore: number;
  rank: number;
  isClaimed?: boolean;
  signature?: {
    signature: string;
    data: string;
  };
  amount?: string;
};
