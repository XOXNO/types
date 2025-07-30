import { ApiProperty } from '@nestjs/swagger';

export class ShareholderDto {
  @ApiProperty({
    description: 'The wallet address of the shareholder',
    example: 'erd1qqqqqqqqqqqqqpgqakt2g7gu2ugahfmqvwyh9fqjlhkfau92jps3lw7a2',
    type: String,
    required: true,
  })
  address!: string;

  @ApiProperty({
    description: 'The percentage share owned by this shareholder',
    example: 25.5,
    type: Number,
    required: true,
    minimum: 0,
    maximum: 100,
  })
  share!: number;
}
