import { ApiProperty } from '@nestjs/swagger';

export class UserMarketInfo {
  @ApiProperty()
  address!: string;
  @ApiProperty()
  token!: string;
  @ApiProperty()
  collateral!: string;
  @ApiProperty()
  collateral_egld!: string;
  @ApiProperty()
  collateralEgldShort!: number;
  @ApiProperty()
  collateralUsd!: number;
  @ApiProperty()
  collateral_htoken!: string;
  @ApiProperty()
  collateralHtokenShort!: number;
  @ApiProperty()
  collateralShort!: number;
  @ApiProperty()
  borrow!: string;
  @ApiProperty()
  borrow_egld!: string;
  @ApiProperty()
  borrowUsd!: number;
  @ApiProperty()
  borrowEgldShort!: number;
  @ApiProperty()
  borrowShort!: number;
  @ApiProperty()
  totalPositionUsd!: number;
  @ApiProperty()
  totalPositionEgld!: number;
  @ApiProperty()
  totalPosition!: number;
  @ApiProperty()
  dominance!: number;
  @ApiProperty()
  dominanceBorrow!: number;
  @ApiProperty()
  fx!: string;
  @ApiProperty()
  fxShort!: number;
}

export class UserInfo {
  @ApiProperty()
  collateral!: string;
  @ApiProperty()
  collateralShort!: number;
  @ApiProperty()
  collateralUsd!: number;
  @ApiProperty()
  borrow!: string;
  @ApiProperty()
  borrowShort!: number;
  @ApiProperty()
  borrowUsd!: number;
  @ApiProperty()
  health!: string;
  @ApiProperty()
  healthPercentage!: number;
  @ApiProperty()
  markets!: UserMarketInfo[];
}
