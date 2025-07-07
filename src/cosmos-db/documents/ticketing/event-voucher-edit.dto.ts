import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

import { IsOptional, IsBoolean, IsInt } from 'class-validator';

import { EventVoucherCreateDto } from './event-voucher-create.dto';

export class EventVoucherEditDto extends PartialType(
  OmitType(EventVoucherCreateDto, ['code', 'eventId'] as const),
) {
  @ApiProperty({
    description: 'Indicates whether the voucher is currently active.',
    required: false,
    type: 'boolean',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Timestamp when the voucher becomes valid.',
    required: false,
    type: 'integer',
  })
  @IsOptional()
  @IsInt()
  startDate?: number;

  @ApiProperty({
    description: 'Timestamp when the voucher expires.',
    required: false,
    type: 'integer',
  })
  @IsOptional()
  @IsInt()
  endDate?: number;
}
