// DTO Type
import { ApiProperty } from '@nestjs/swagger';
import { ActivityChain } from '../../enums/common.enum';
import { TokenDataDocWithBalance } from '../../entities/token-data/token-data.doc';

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

  @ApiProperty({ type: TokenDataDocWithBalance, isArray: true })
  tokens!: TokenDataDocWithBalance[];

  chain!: ActivityChain;
}
