import { ApiProperty } from '@nestjs/swagger';
import { ActivityChain } from '../../../enums/common.enum';
import { normalizeLendingChain } from './lending-chain';

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

  @ApiProperty({
    description: 'Blockchain network this PnL entry belongs to',
    required: false,
    enum: ActivityChain,
    example: ActivityChain.MVX,
  })
  chain: ActivityChain = ActivityChain.MVX;

  constructor(props?: Partial<LendingAccountPnl>) {
    Object.assign(this, props);
    this.chain = normalizeLendingChain(this.chain);
  }
}
