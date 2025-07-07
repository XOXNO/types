import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';
import { EgldOrEsdtTokenPayment } from '../../../common/tokenPayent';

export class EventStageProfileCreateDto {
  @ApiProperty()
  @IsUUID()
  ticketId!: string;

  @ApiProperty()
  @IsString()
  @Length(3, 30)
  name!: string;

  @ApiProperty({
    minimum: Math.floor(Date.now() / 1000),
    type: 'integer',
    description: 'Start time timestamp',
  })
  @IsInt()
  @Min(Math.floor(Date.now() / 1000))
  startTime!: number;

  @ApiProperty({
    minimum: Math.floor(Date.now() / 1000) + 86400,
    type: 'integer',
    description: 'End time timestamp',
  })
  @IsInt()
  @Min(Math.floor(Date.now() / 1000) + 86400)
  endTime!: number;

  @ApiProperty({
    type: 'integer',
    description: 'Maximum limit for this stage (0 for unlimited)',
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  maxLimit!: number;

  @ApiProperty({
    type: 'integer',
    description: 'Maximum limit per user for this stage (0 for unlimited)',
    required: false,
  })
  @IsInt()
  @IsOptional()
  userLimit!: number;

  @ApiProperty({
    type: 'boolean',
    description: 'Is this stage enabled for sales?',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isEnabled!: boolean;

  @ApiProperty({
    type: 'boolean',
    description: 'Is this stage restricted to a whitelist?',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isWhitelist!: boolean;

  @ApiProperty({
    type: 'boolean',
    description: 'Does registration/payment require approval?',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  requiredApproval!: boolean;

  @ApiProperty({ type: [EgldOrEsdtTokenPayment] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EgldOrEsdtTokenPayment)
  prices!: EgldOrEsdtTokenPayment[];
}
