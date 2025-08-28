import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsString } from 'class-validator';

export class SignMintDto {
  @ApiProperty({
    type: 'integer',
    description: 'The quantity of the requested mint amount',
  })
  @IsNumber()
  quantity!: number;

  @ApiProperty({
    type: String,
    description: 'The stage unique name',
  })
  @IsString()
  stage!: string;
}
