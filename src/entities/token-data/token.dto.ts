// file: dtos/token.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class TokenDocDto {
  @ApiProperty({
    description: 'ID of the token',
    example: 'EGLD',
    required: false,
  })
  id?: string;

  @ApiProperty({ description: 'Identifier of the token', example: 'EGLD' })
  identifier!: string;

  @ApiProperty({
    description: 'Collection of the token',
    example: 'FungibleTokenInfo',
    required: false,
  })
  collection?: string;

  @ApiProperty({
    description: 'Data type of the token',
    example: 'fungibleTokenProfile',
  })
  dataType!: string;

  @ApiProperty({ description: 'Decimals of the token', example: 18 })
  decimals!: number;

  @ApiProperty({ description: 'Name of the token', example: 'EGLD' })
  name!: string;

  @ApiProperty({ description: 'Type of the token', example: 'FungibleESDT' })
  type!: string;

  @ApiProperty({
    description: 'Categories of the token',
    example: ['all', 'trade', 'staking', 'minting', 'p2p'],
  })
  category!: string[];

  @ApiProperty({
    description: 'SVG URL of the token logo',
    example: 'https://media.xoxno.com/tokens/EGLD/logo.svg',
  })
  svgUrl!: string;

  @ApiProperty({
    description: 'PNG URL of the token logo',
    example: 'https://media.xoxno.com/tokens/EGLD/logo.png',
  })
  pngUrl!: string;

  @ApiProperty({ description: 'Ticker of the token', example: 'EGLD' })
  ticker!: string;

  @ApiProperty({
    description: 'Timestamp',
    example: 1705933418,
    required: false,
  })
  _ts?: number;

  @ApiProperty({
    description: 'USD price of the token',
    example: 35.70543073773239,
  })
  usdPrice!: number;
}
