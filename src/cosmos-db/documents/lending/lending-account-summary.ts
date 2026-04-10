import { ApiProperty } from '@nestjs/swagger';
import { ActivityChain } from '../../../enums/common.enum';

export class SingleLendingAccountToken {
  @ApiProperty()
  amount!: string;

  @ApiProperty()
  amountShort!: number;

  @ApiProperty()
  decimals!: number;

  @ApiProperty()
  liquidationThreshold!: string;

  @ApiProperty()
  ltv!: string;

  @ApiProperty()
  usdPrice!: number;

  @ApiProperty()
  apy!: string;

  @ApiProperty()
  token!: string;
}

export class LendingAccountSummary {
  @ApiProperty()
  supplied!: SingleLendingAccountToken[];

  @ApiProperty()
  borrowed!: SingleLendingAccountToken[];

  @ApiProperty()
  liquidationCollateralInDollars!: string;

  @ApiProperty()
  collateralInDollars!: string;

  @ApiProperty()
  borrowedInDollars!: string;

  @ApiProperty()
  collateralInEgld!: string;

  @ApiProperty()
  borrowedInEgld!: string;

  @ApiProperty()
  totalApy!: string;

  @ApiProperty()
  healthFactor!: string;

  @ApiProperty({
    description: 'Blockchain network the account summary belongs to',
    required: false,
    enum: ActivityChain,
    example: ActivityChain.MVX,
  })
  chain: ActivityChain = ActivityChain.MVX;
}
