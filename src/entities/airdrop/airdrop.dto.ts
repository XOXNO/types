import { Wallet } from '../../utils/types';

interface IType {
  tokenAllocation: number;
  totalScore: number;
  rank: number;
  isClaimed?: boolean;
  signature: {
    signature: string;
    data: string;
  };
  amount?: string;
}

export type AirdropDto = IType & { wallet: string };

export class AirdropDtoHydrated implements IType {
  wallet!: Wallet;

  tokenAllocation!: number;
  totalScore!: number;
  rank!: number;
  isClaimed?: boolean | undefined;
  signature!: { signature: string; data: string };
  amount?: string | undefined;

  constructor(args: Partial<AirdropDtoHydrated>) {
    Object.assign(this, args);
  }
}
