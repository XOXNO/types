import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';
import { ActivityChain } from '../../common/enums';

export class FilterQueryDto {
  @ApiProperty({
    description: 'The search query',
    example: '@mihai',
  })
  @IsString()
  name!: string;

  @ApiProperty({ required: false, type: 'integer' })
  top?: number = 25;
  @ApiProperty({ required: false, type: 'integer' })
  skip?: number = 0;
  chain?: ActivityChain[];
  orderBy?: string[];
  select?: string[];
}
