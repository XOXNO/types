import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsOptional, ValidateNested, IsBoolean } from 'class-validator';

import { EventVoucherDoc } from './event-voucher.doc';
import { RewardDetails } from './event-referral-config.doc';
import { ShortVoucherDoc } from '../short/short-voucher.doc';

export class EventReferralConfigCreateDto {
  @ApiProperty({
    description:
      'Voucher automatically applied as a discount when this referral code is used.',
    type: EventVoucherDoc,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ShortVoucherDoc)
  appliedVoucher?: ShortVoucherDoc;

  @ApiProperty({
    description:
      'Details about the reward issued to the referral owner after certain conditions are met.',
    type: RewardDetails,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RewardDetails)
  rewardDetails?: RewardDetails;

  @ApiProperty({
    description:
      'Indicates whether normal guests can generate and share their unique referral codes for this event.',
    type: 'boolean',
  })
  @IsBoolean()
  isSelfService!: boolean;

  @ApiProperty({
    description: 'Indicates whether the referral program is currently active.',
    type: 'boolean',
  })
  @IsBoolean()
  isActive!: boolean;
}
