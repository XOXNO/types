import { ApiProperty } from '@nestjs/swagger';
import { EsdtTokenType, EsdtTokenSubType } from '../../enums';

export class EsdtTokenProperties {
  @ApiProperty({
    description: 'Token identifier (ticker) on the blockchain',
    example: 'EGLD-abcdef',
    type: String,
  })
  tokenIdentifier = '';
  @ApiProperty({
    description: 'Human-readable name of the token',
    example: 'MultiversX Gold',
    type: String,
  })
  name = '';
  @ApiProperty({
    description: 'Type of ESDT token',
    enum: EsdtTokenType,
    enumName: 'EsdtTokenType',
  })
  type!: EsdtTokenType;
  @ApiProperty({
    description: 'Subtype of ESDT token',
    enum: EsdtTokenSubType,
    enumName: 'EsdtTokenSubType',
  })
  subType!: EsdtTokenSubType;
  @ApiProperty({
    description: 'Token owner wallet address',
    example: 'erd1qqqqqqqqqqqqqpgq5za2j0xkucera8epyusgvm7xvvpgksdm3y4sk3me3j',
    type: String,
  })
  owner = '';
  @ApiProperty({
    description:
      'Token supply as a number (may lose precision for large values)',
    example: 1000000,
    type: Number,
  })
  supply = 0;
  @ApiProperty({
    description: 'Token supply as a string to preserve precision',
    example: '1000000000000000000',
    type: String,
  })
  supplyLong = '0';
  @ApiProperty({
    description: 'Total amount of tokens burned',
    example: '50000000000000000',
    type: String,
  })
  burntValue!: string;
  @ApiProperty({
    description: 'Number of decimal places for the token',
    example: 18,
    type: Number,
  })
  decimals = 0;
  @ApiProperty({
    description: 'Whether token transfers are currently paused',
    example: false,
    type: Boolean,
  })
  isPaused = false;
  @ApiProperty({
    description: 'Whether the token can be upgraded',
    example: true,
    type: Boolean,
  })
  canUpgrade = false;
  @ApiProperty({
    description: 'Whether new tokens can be minted',
    example: true,
    type: Boolean,
  })
  canMint = false;
  @ApiProperty({
    description: 'Whether tokens can be burned',
    example: true,
    type: Boolean,
  })
  canBurn = false;
  @ApiProperty({
    description: 'Whether token ownership can be transferred',
    example: true,
    type: Boolean,
  })
  canChangeOwner = false;
  @ApiProperty({
    description: 'Whether token transfers can be paused',
    example: true,
    type: Boolean,
  })
  canPause = false;
  @ApiProperty({
    description: 'Whether specific accounts can be frozen',
    example: true,
    type: Boolean,
  })
  canFreeze = false;
  @ApiProperty({
    description: 'Whether tokens can be wiped from frozen accounts',
    example: true,
    type: Boolean,
  })
  canWipe = false;
  @ApiProperty({
    description: 'Whether special roles can be added to accounts',
    example: true,
    type: Boolean,
  })
  canAddSpecialRoles = false;
  @ApiProperty({
    description: 'Whether NFT creation role can be transferred',
    example: true,
    type: Boolean,
  })
  canTransferNFTCreateRole = false;
  @ApiProperty({
    description: 'Whether NFT creation has been stopped',
    example: false,
    type: Boolean,
  })
  nftCreateStopped = false;
  @ApiProperty({
    description: 'Total quantity of tokens that have been wiped',
    example: 0,
    type: Number,
  })
  wipedQuantity = 0;
  @ApiProperty({
    description: 'Whether tokens can be created across multiple shards',
    example: false,
    type: Boolean,
  })
  canCreateMultiShard = false;

  constructor(props?: Partial<EsdtTokenProperties>) {
    Object.assign(this, props);
  }
}
