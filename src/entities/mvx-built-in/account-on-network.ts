import { AddressUtils } from '@multiversx/sdk-nestjs-common';

export class MvxAccountDetails {
  address = '';
  nonce = 0;
  balance!: string;
  balanceShort = 0;
  username = '';
  ownerAddress?: string;
  isUpgradeable?: boolean;
  isReadable?: boolean;
  isGuarded?: boolean;
  isPayable?: boolean;
  isPayableBySmartContract?: boolean;
  shard?: number;
  usdValue?: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(init?: any) {
    delete init?.['code'];
    delete init?.['codeHash'];
    delete init?.['rootHash'];
    delete init?.['developerReward'];
    const codeMetadata = AddressUtils.decodeCodeMetadata(
      init?.['codeMetadata'] ?? {},
    );
    if (codeMetadata) {
      this.isUpgradeable = codeMetadata.isUpgradeable;
      this.isReadable = codeMetadata.isReadable;
      this.isGuarded = codeMetadata.isGuarded;
      this.isPayable = codeMetadata.isPayable;
      this.isPayableBySmartContract = codeMetadata.isPayableBySmartContract;
    }
    delete init?.['codeMetadata'];
    Object.assign(this, init);
    if (this.ownerAddress === '') {
      delete this.ownerAddress;
    }
    this.shard = AddressUtils.computeShard(
      AddressUtils.bech32Decode(this.address),
      3,
    );
  }
}
