import { ApiProperty } from '@nestjs/swagger';

class AshTokenDto {
  @ApiProperty({ example: 'PADAWAN-a17f58' })
  address!: string;

  @ApiProperty({ example: 18 })
  decimal!: number;
}

class PoolDto {
  @ApiProperty({ type: AshTokenDto, isArray: true })
  allTokens!: AshTokenDto[];

  @ApiProperty({ example: 'onedex' })
  type!: string;
}

class HopDto {
  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqqz6vp9y50ep867vnr296mqf3dduh6guvmvlsu3sujc',
  })
  poolId!: string;

  @ApiProperty({ type: PoolDto })
  pool!: PoolDto;

  @ApiProperty({ example: 'PADAWAN-a17f58' })
  tokenIn!: string;

  @ApiProperty({ example: '4182.199770163362929142' })
  tokenInAmount!: string;

  @ApiProperty({ example: 'WEGLD-bd4d79' })
  tokenOut!: string;

  @ApiProperty({ example: '1.776845552107565998' })
  tokenOutAmount!: string;
}

class RouteDto {
  @ApiProperty({ type: HopDto, isArray: true })
  hops!: HopDto[];

  @ApiProperty({ example: 'PADAWAN-a17f58' })
  tokenIn!: string;

  @ApiProperty({ example: '4182.199770163362929142' })
  tokenInAmount!: string;

  @ApiProperty({ example: 'WEGLD-bd4d79' })
  tokenOut!: string;

  @ApiProperty({ example: '1.776845552107565998' })
  tokenOutAmount!: string;
}

class SwapDto {
  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqqz6vp9y50ep867vnr296mqf3dduh6guvmvlsu3sujc',
  })
  poolId!: string;

  @ApiProperty({ example: 0 })
  assetInIndex!: number;

  @ApiProperty({ example: 1 })
  assetOutIndex!: number;

  @ApiProperty({ example: '4182199770163362929142' })
  amount!: string;

  @ApiProperty({ example: '1776845552107565998' })
  returnAmount!: string;

  @ApiProperty({ example: 'PADAWAN-a17f58' })
  assetIn!: string;

  @ApiProperty({ example: 'WEGLD-bd4d79' })
  assetOut!: string;

  @ApiProperty({ example: 'swapMultiTokensFixedInput' })
  functionName!: string;

  @ApiProperty({
    type: [String],
    isArray: true,
    example: ['AQ==', '', 'UEFEQVdBTi1hMTdmNTg=', 'V0VHTEQtYmQ0ZDc5'],
  })
  arguments!: string[];
}

class OriginalDto {
  @ApiProperty({ type: String, isArray: true })
  tokenAddresses!: string[];

  @ApiProperty({ type: SwapDto, isArray: true })
  swaps!: SwapDto[];

  @ApiProperty({ example: '7551.21881510239555991' })
  swapAmount!: string;

  @ApiProperty({ example: '3.208300850633318163' })
  returnAmount!: string;

  @ApiProperty({ example: '7551218815102395559910' })
  swapAmountWithDecimal!: string;

  @ApiProperty({ example: '3208300850633318163' })
  returnAmountWithDecimal!: string;

  @ApiProperty({ example: 'PADAWAN-a17f58' })
  tokenIn!: string;

  @ApiProperty({ example: 'WEGLD-bd4d79' })
  tokenOut!: string;

  @ApiProperty({ example: '2348.014436081921556678' })
  marketSp!: string;

  @ApiProperty({ type: RouteDto, isArray: true })
  routes!: RouteDto[];

  @ApiProperty({ example: 2353.650473150542 })
  effectivePrice!: number;

  @ApiProperty({ example: 0.00042487192189646716 })
  effectivePriceReserved!: number;

  @ApiProperty({ example: 0.002394593901224484 })
  priceImpact!: number;

  @ApiProperty({ example: 'None' })
  warning!: string;

  @ApiProperty({ example: '3.192259346380151572' })
  minReturnAmount!: string;

  @ApiProperty({ example: '3192259346380151572' })
  minReturnAmountWithDecimal!: string;
}

export class FetchSwapRoutesResponseDto {
  @ApiProperty({
    example:
      '0000000e5041444157414e2d6131376635380000000c5745474c442d62643464373900000009e2b7ae54b8339019f60000000000000000050000b4c094947e427d79931a8bad81316b797d238cdb3f00000019737761704d756c7469546f6b656e734669786564496e707574000000040000000101000000000000000e5041444157414e2d6131376635380000000c5745474c442d6264346437390000000e5041444157414e2d6131376635380000000c424f4245522d39656237363400000009b6a2880b8b4cd315f00000000000000000050000b4c094947e427d79931a8bad81316b797d238cdb3f00000019737761704d756c7469546f6b656e734669786564496e707574000000040000000101000000000000000e5041444157414e2d6131376635380000000c424f4245522d3965623736340000000c424f4245522d3965623736340000000c5745474c442d6264346437390000000000000000000000000500490c9a6ff1c993e899c9d9df08eecca3f748bd2954830000001473776170546f6b656e734669786564496e707574000000020000000c5745474c442d6264346437390000000101',
  })
  argument!: string;

  @ApiProperty({
    example:
      '0000000e5041444157414e2d613137663538000000000000000c424f4245522d396562373634000000000000000c5745474c442d626434643739000000082c4d2ef653e8db14',
  })
  limits!: string;

  @ApiProperty({ example: 75000000 })
  extraGasLimit!: number;

  @ApiProperty({ example: 7551.218815102396 })
  swapAmount!: number;

  @ApiProperty({ example: 'PADAWAN-a17f58' })
  paymentToken!: string;

  @ApiProperty({ example: '7.55121881510239555991e+21' })
  bigUintAmount!: string;

  @ApiProperty({ type: OriginalDto })
  original!: OriginalDto;
}
