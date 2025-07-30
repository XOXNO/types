import { ApiProperty } from '@nestjs/swagger';
import { AddressUtils } from '@multiversx/sdk-nestjs-common';

export class MvxAccountDetails {
  @ApiProperty({
    description: 'Wallet address on the MultiversX network',
    example: 'erd1qqqqqqqqqqqqqpgq5za2j0xkucera8epyusgvm7xvvpgksdm3y4sk3me3j',
    type: String,
  })
  address = '';

  @ApiProperty({
    description: 'Account nonce (transaction count)',
    example: 42,
    type: Number,
  })
  nonce = 0;

  @ApiProperty({
    description: 'Account balance in smallest denomination',
    example: '1000000000000000000',
    type: String,
  })
  balance!: string;

  @ApiProperty({
    description: 'Account balance as a number (may lose precision)',
    example: 1.5,
    type: Number,
  })
  balanceShort = 0;

  @ApiProperty({
    description: 'Herotag/username associated with the address',
    example: 'alice.x',
    type: String,
  })
  username = '';

  @ApiProperty({
    description: 'Owner address for smart contracts',
    example: 'erd1qqqqqqqqqqqqqpgq5za2j0xkucera8epyusgvm7xvvpgksdm3y4sk3me3j',
    type: String,
    required: false,
  })
  ownerAddress?: string;

  @ApiProperty({
    description: 'Whether the smart contract is upgradeable',
    example: true,
    type: Boolean,
    required: false,
  })
  isUpgradeable?: boolean;

  @ApiProperty({
    description: 'Whether the smart contract storage is readable',
    example: true,
    type: Boolean,
    required: false,
  })
  isReadable?: boolean;

  @ApiProperty({
    description: 'Whether the account has guardian protection',
    example: false,
    type: Boolean,
    required: false,
  })
  isGuarded?: boolean;

  @ApiProperty({
    description: 'Whether the smart contract can receive payments',
    example: true,
    type: Boolean,
    required: false,
  })
  isPayable?: boolean;

  @ApiProperty({
    description:
      'Whether the smart contract can receive payments from other smart contracts',
    example: true,
    type: Boolean,
    required: false,
  })
  isPayableBySmartContract?: boolean;

  @ApiProperty({
    description: 'Shard number where the account resides',
    example: 1,
    type: Number,
    required: false,
    minimum: 0,
    maximum: 2,
  })
  shard?: number;

  @ApiProperty({
    description: 'USD value of the account balance',
    example: 125.5,
    type: Number,
    required: false,
  })
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
