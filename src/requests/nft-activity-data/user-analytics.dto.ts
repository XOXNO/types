import { ApiProperty } from '@nestjs/swagger';

class TransactionDetailsDto {
  @ApiProperty({ example: 0 })
  price!: number;

  @ApiProperty({
    example: '7bb66ddd5682070b42c6d4a77acc2920ad21680ad73a75a2a531dfed888c6bed',
  })
  txHash!: string;

  @ApiProperty({ example: 1642719714 })
  timestamp!: number;

  @ApiProperty({ example: 'BANANA-e955fd-05a0' })
  identifier!: string;
}

class AveragePriceDto {
  @ApiProperty({ example: 0.225 })
  price!: number;
}

class AnalyticsDto {
  @ApiProperty({ example: 141 })
  count!: number;

  @ApiProperty({ example: 31.758 })
  volume!: number;

  @ApiProperty({ type: TransactionDetailsDto })
  min!: TransactionDetailsDto;

  @ApiProperty({ type: TransactionDetailsDto })
  max!: TransactionDetailsDto;

  @ApiProperty({ type: AveragePriceDto })
  avg!: AveragePriceDto;
}

export class UserAnalyticsDto {
  @ApiProperty({ type: AnalyticsDto })
  Purchase!: AnalyticsDto;

  @ApiProperty({ type: AnalyticsDto })
  Sale!: AnalyticsDto;
}
