import { ActivityChain } from '../../common/enums';

class AirdropRawClass {
  tokenAllocation!: number;
  totalScore!: number;
  rank!: number;
  isClaimed?: boolean;
  signature?: {
    signature: string;
    data: string;
  };
  amount?: string;
}

export type AirdropRaw = AirdropRawClass & { wallet: string };

export interface Wallet {
  address: string;
  addressTrimmed: string;
  profile: string;
  username: string;
  isVerified: boolean;
  chain?: ActivityChain;
}

export class AirdropDto extends AirdropRawClass {
  wallet!: Wallet;
}
