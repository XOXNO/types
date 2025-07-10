import { Wallet } from '../../utils/types';

class AirdropDtoBase {
  tokenAllocation!: number;
  totalScore!: number;
  rank!: number;

  constructor(props: Partial<AirdropDtoBase>) {
    Object.assign(this, props);
  }
}

export class AirdropDto extends AirdropDtoBase {
  wallet!: string;

  constructor(props: Partial<AirdropDtoBase>) {
    super(props);
  }
}

export class AirdropDtoHydrated extends AirdropDtoBase {
  wallet!: Wallet;
  signature!: { signature: string; data: string };
  isClaimed!: boolean;
  amount!: string;

  constructor(props: Partial<AirdropDtoBase>) {
    super(props);
  }
}
