export class MvxAccountDetails {
  address: string = '';
  nonce: number = 0;
  balance!: string;
  balanceShort: number = 0;
  username: string = '';
  ownerAddress?: string;
  isUpgradeable?: boolean;
  isReadable?: boolean;
  isGuarded?: boolean;
  isPayable?: boolean;
  isPayableBySmartContract?: boolean;
  shard?: number;
  usdValue?: number;
  code?: string;
  codeHash?: string;
  rootHash?: string;
  developerReward?: string;
  codeMetadata?: string;

  constructor(init?: Partial<MvxAccountDetails>) {
    delete init?.['code'];
    delete init?.['codeHash'];
    delete init?.['rootHash'];
    delete init?.['developerReward'];
    if (init?.['codeMetadata']) {
      delete init['codeMetadata'];
      // const codeMetadata = AddressUtils.decodeCodeMetadata(
      //   init['codeMetadata'],
      // );

      // this.isUpgradeable = codeMetadata.isUpgradeable;
      // this.isReadable = codeMetadata.isReadable;
      // this.isGuarded = codeMetadata.isGuarded;
      // this.isPayable = codeMetadata.isPayable;
      // this.isPayableBySmartContract = codeMetadata.isPayableBySmartContract;
    }
    Object.assign(this, init);
    if (this.ownerAddress === '') {
      delete this.ownerAddress;
    }
    // TODO: Add sahrd number
    // this.shard = AddressUtils.computeShard(
    //   AddressUtils.bech32Decode(this.address),
    //   3,
    // );
  }
}
