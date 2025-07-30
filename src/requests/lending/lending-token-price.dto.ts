import { ApiProperty } from '@nestjs/swagger';

export class LendingTokenPriceDto {
  @ApiProperty({
    description: 'Token price in USD as a string to preserve precision',
    example: '125.50',
    type: String,
  })
  price!: string;
}
