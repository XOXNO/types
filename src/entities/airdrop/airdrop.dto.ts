import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '../../utils/types';

class AirdropDtoBase {
  @ApiProperty({
    description: 'Number of tokens allocated to this recipient',
    example: 1000,
    type: Number,
  })
  tokenAllocation!: number;

  @ApiProperty({
    description: 'Total score calculated for airdrop eligibility',
    example: 850.5,
    type: Number,
  })
  totalScore!: number;

  @ApiProperty({
    description: 'Rank position in the airdrop distribution',
    example: 42,
    type: Number,
    minimum: 1,
  })
  rank!: number;

  constructor(props?: Partial<AirdropDtoBase>) {
    Object.assign(this, props);
  }
}

export class AirdropDto extends AirdropDtoBase {
  @ApiProperty({
    description: 'Wallet address of the airdrop recipient',
    example: 'erd1qqqqqqqqqqqqqpgq5za2j0xkucera8epyusgvm7xvvpgksdm3y4sk3me3j',
    type: String,
  })
  wallet!: string;
}

export class AirdropDtoHydrated extends AirdropDtoBase {
  @ApiProperty({
    description: 'Wallet object containing address and shard information',
    type: Object,
  })
  wallet!: Wallet;

  @ApiProperty({
    description: 'Signature data for claiming the airdrop',
    type: Object,
    required: false,
    example: { signature: '0x...', data: '0x...' },
  })
  signature?: { signature: string; data: string };

  @ApiProperty({
    description: 'Whether the airdrop has been claimed',
    example: false,
    type: Boolean,
    required: false,
  })
  isClaimed?: boolean;

  @ApiProperty({
    description: 'Exact amount to be claimed in smallest denomination',
    example: '1000000000000000000',
    type: String,
    required: false,
  })
  amount?: string;
}
