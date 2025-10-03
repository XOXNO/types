import { ApiProperty } from '@nestjs/swagger';

export class LendingAccountPnl {
  @ApiProperty()
  Token!: string;

  @ApiProperty()
  Identifier!: string;

  @ApiProperty()
  PnlUSD!: number;

  @ApiProperty()
  PnlToken!: number;

  @ApiProperty()
  Debt!: number;

  @ApiProperty()
  DebtUSD!: number;

  @ApiProperty()
  Interest!: number;

  @ApiProperty()
  InterestUSD!: number;
}
