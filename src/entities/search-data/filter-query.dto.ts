import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class FilterQueryDto {
  @ApiProperty({
    description: 'The search query',
    example: '@mihai',
  })
  @IsString()
  name!: string;
}
