import { ApiProperty } from '@nestjs/swagger';

import {
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
  IsNumber,
} from 'class-validator';

export class EventTicketProfileCreateDto {
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  name!: string;

  @ApiProperty()
  @IsString()
  @Length(3, 300)
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: 'number',
    description: 'Royalties percentage (0-90)',
    required: false,
  })
  @IsNumber()
  @Min(0)
  @Max(90)
  @IsOptional()
  royalties!: number;

  @ApiProperty()
  @IsString()
  @Length(3, 30)
  @Matches(/^#([0-9A-F]{3}){1,2}$/i, {
    message: 'badgeColor must be a valid hex color',
  })
  @IsOptional()
  badgeColor!: string;

  @ApiProperty({
    type: 'integer',
    description: 'Maximum limit for this ticket type (0 for unlimited)',
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  maxLimit!: number;

  @ApiProperty({
    type: 'integer',
    description:
      'Maximum limit per user for this ticket type (0 for unlimited)',
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  userLimit!: number;
}
