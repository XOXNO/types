import { ApiProperty } from '@nestjs/swagger';

class UserTradingSummaryMin {
  @ApiProperty()
  price!: number;
  @ApiProperty()
  txHash!: string;
  @ApiProperty()
  timestamp!: number;
  @ApiProperty()
  identifier!: string;
}

class UserTradingSummaryPrice {
  @ApiProperty()
  price!: number;
}

export class UserTradingSummary {
  @ApiProperty()
  count!: number;
  @ApiProperty()
  volume!: number;
  @ApiProperty()
  min!: UserTradingSummaryMin;
  @ApiProperty()
  max!: UserTradingSummaryMin;
  @ApiProperty()
  avg!: UserTradingSummaryPrice;
}

export type TradingSummaryActivityType = 'Purchase' | 'Sale';
