import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  Max,
  IsBoolean,
  IsInt,
} from 'class-validator';

import { EventVoucherDoc } from './event-voucher.doc';
import { VoucherType } from '../../../enums/voucher-type.enum';

export class EventVoucherCreateDto extends PartialType(
  OmitType(EventVoucherDoc, [
    'id',
    'dataType',
    'usedCount',
    'createdAt',
    'createdBy',
  ] as never),
) {
  @ApiProperty({ description: 'Unique voucher code.', required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    description: 'Type of discount provided by the voucher.',
    enum: VoucherType,
    enumName: 'VoucherType',
  })
  @IsEnum(VoucherType)
  type!: VoucherType;

  @ApiProperty({
    description: 'The discount value. Fixed amount or percentage.',
    type: 'number',
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  amount!: number;

  @ApiProperty({
    description: 'Optional maximum discount cap for percentage-based vouchers.',
    required: false,
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxDiscountAmount?: number;

  @ApiProperty({
    description: 'Total number of uses allowed for this voucher.',
    type: 'integer',
  })
  @IsInt()
  @Min(1)
  maxUses!: number;

  @ApiProperty({
    description: 'Maximum uses allowed per user.',
    type: 'integer',
  })
  @IsInt()
  @Min(1)
  maxUsesPerUser!: number;

  @ApiProperty({
    description: 'The specific eventId where the voucher can be used',
  })
  @IsUUID(4)
  eventId!: string;

  @ApiProperty({
    description: 'Timestamp when the voucher becomes valid.',
    required: false,
    type: 'integer',
  })
  @IsOptional()
  @IsInt()
  @Min(Math.floor(Date.now() / 1000))
  startDate?: number;

  @ApiProperty({
    description: 'Timestamp when the voucher expires.',
    required: false,
    type: 'integer',
  })
  @IsOptional()
  @IsInt()
  @Min(Math.floor(Date.now() / 1000))
  endDate?: number;

  @ApiProperty({
    description: 'Indicates whether the voucher is currently active.',
    type: 'boolean',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
