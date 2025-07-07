import { ApiProperty } from '@nestjs/swagger';

import { ArrayNotEmpty, IsArray, IsNumber, IsString } from 'class-validator';

export class SignAcceptGlobalOfferDto {
  @ApiProperty({
    type: Number,
    example: 1233,
    description: 'The offer ID that has to be removed',
  })
  @IsNumber()
  offerId!: number;

  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({
    type: String,
    isArray: true,
    example: ['ABC-asdasd-01'],
    description: 'The unique identifiers that will be sold',
  })
  @IsString({ each: true })
  identifier!: string[];
}
