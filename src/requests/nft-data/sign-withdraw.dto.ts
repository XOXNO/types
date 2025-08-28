import { ApiProperty } from '@nestjs/swagger';

import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export class SignWithdrawDto {
  @ApiProperty({
    isArray: true,
    type: 'integer',
    description: 'Array of auction IDs that have to be signed',
    example: [123123, 15555],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
  auctionId!: number[];
}
