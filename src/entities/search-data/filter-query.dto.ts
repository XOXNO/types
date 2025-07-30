import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';
import { ActivityChain } from '../../enums/common.enum';

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
  @ApiProperty({
    description: 'Filter by blockchain chains',
    enum: ActivityChain,
    enumName: 'ActivityChain',
    isArray: true,
    required: false,
    example: [ActivityChain.MVX],
  })
  chain?: ActivityChain[];
  @ApiProperty({
    description:
      'Fields to sort by with direction (e.g., "name asc", "timestamp desc")',
    isArray: true,
    required: false,
    example: ['name asc', 'timestamp desc'],
    type: String,
  })
  orderBy?: string[];
  @ApiProperty({
    description: 'Fields to include in the response',
    isArray: true,
    required: false,
    example: ['name', 'identifier', 'collection'],
    type: String,
  })
  select?: string[];
}
