import { ApiProperty } from '@nestjs/swagger';

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
  totalApy!: string;

  @ApiProperty()
  healthFactor!: string;
}
