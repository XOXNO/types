// file: dtos/holder.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class WalletDetailDto {
  @ApiProperty({ description: 'Count of NFTs', example: 4827 })
  count!: number;

  @ApiProperty({ description: 'Weight percentage', example: 86.51 })
  weight!: number;

  @ApiProperty({
    description: 'Address of the holder',
    example: 'erd1qqqqqqqqqqqqqpgqvpkd3g3uwludduv3797j54qt6c888wa59w2shntt6z',
  })
  address!: string;

  @ApiProperty({
    description: 'Username of the holder',
    example: 'Staking: XOXNO',
  })
  username!: string;

  @ApiProperty({ description: 'Type of the holder', example: 'staking' })
  type!: string;
}

export class CollectionHoldersDto {
  @ApiProperty({ description: 'Total supply of NFTs', example: 5580 })
  totalSupply!: number;

  @ApiProperty({ type: () => WalletDetailDto, isArray: true })
  walletDetails!: WalletDetailDto[];

  @ApiProperty({
    description: 'Details of NFTs on market',
    example: { count: 211, weight: 3.78 },
  })
  onMarket!: {
    count: number;
    weight: number;
  };

  @ApiProperty({
    description: 'Details of staked NFTs',
    example: { count: 4827, weight: 86.51 },
  })
  staked!: {
    count: number;
    weight: number;
  };

  @ApiProperty({
    description: 'Details of NFTs in other smart contracts',
    example: { count: 10, weight: 0.18 },
  })
  otherSCs!: {
    count: number;
    weight: number;
  };

  @ApiProperty({
    description: 'Details of NFTs in burn wallet',
    example: { count: 0, weight: 0 },
  })
  burnWallet!: {
    count: number;
    weight: number;
  };

  @ApiProperty({
    description: 'Details of unique holders',
    example: { count: 764, weight: 13.69 },
  })
  uniqueHolders!: {
    count: number;
    weight: number;
  };

  @ApiProperty({
    description: 'Details of holded NFTs',
    example: { count: 532, weight: 9.53, avgPerHodler: 2.18 },
  })
  holded!: {
    count: number;
    weight: number;
    avgPerHodler: number;
  };
}
