// DTO Type
import { ApiProperty } from '@nestjs/swagger';
import { ActivityChain } from '../../enums/common.enum';

class TokenAssetsDto {
  @ApiProperty({
    example: 'https://media.xoxno.com/tokens/TIME-84518f/logo.png',
  })
  pngUrl!: string;

  @ApiProperty({
    example: 'https://media.xoxno.com/tokens/TIME-84518f/logo.svg',
  })
  svgUrl!: string;
}

export class SuiCoinObjectDto {
  objectId!: string;
  balance!: string;
  digest!: string;
  version!: string;
}

export class TokenDto {
  @ApiProperty({ example: 0 })
  nonce!: number;

  @ApiProperty({ example: 'TIME-84518f' })
  identifier!: string;

  @ApiProperty({ example: 18 })
  decimals!: number;

  @ApiProperty({ example: '514203000000000000000' })
  balance!: string;

  @ApiProperty({ example: 'TIME' })
  ticker!: string;

  @ApiProperty({ example: 'TIME' })
  name!: string;

  @ApiProperty({ example: 514.203 })
  shortBalance!: number;

  @ApiProperty({ example: 12.160648172030305 })
  usdPrice!: number;

  @ApiProperty({ example: 6253.041772002499 })
  usdValue!: number;

  @ApiProperty({ example: 171.32505804164822 })
  egldValue!: number;

  @ApiProperty({ type: TokenAssetsDto })
  assets!: TokenAssetsDto;

  @ApiProperty({ example: false })
  isAshSupported!: boolean;

  @ApiProperty({ example: 83.21 })
  weight!: number;

  objects?: SuiCoinObjectDto[];
}

class WalletDto {
  @ApiProperty({ example: 7514.91 })
  usdValue!: number;

  @ApiProperty({ example: 205.899 })
  egldValue!: number;

  @ApiProperty({ example: 100 })
  weight!: number;
}

class EsdtsDto {
  @ApiProperty({ example: 7496.669 })
  usdValue!: number;

  @ApiProperty({ example: 205.399 })
  egldValue!: number;

  @ApiProperty({ example: 99.74 })
  weight!: number;
}

class StablesDto {
  @ApiProperty({ example: 0 })
  usdValue!: number;

  @ApiProperty({ example: 0 })
  egldValue!: number;

  @ApiProperty({ example: 0 })
  weight!: number;
}

export class UserTokenInventoryResponseDto {
  @ApiProperty({ type: WalletDto })
  wallet!: WalletDto;

  @ApiProperty({ type: EsdtsDto })
  esdts!: EsdtsDto;

  @ApiProperty({ type: StablesDto })
  stables!: StablesDto;

  @ApiProperty({ type: TokenDto, isArray: true })
  tokens!: TokenDto[];

  chain!: ActivityChain;
}
