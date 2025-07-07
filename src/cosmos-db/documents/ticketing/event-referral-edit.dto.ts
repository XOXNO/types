import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class EventReferralEditDto {
  @ApiProperty({
    description: 'The code shared by the referral owner.',
    required: false,
  })
  @IsOptional()
  @IsString()
  referralCode?: string;

  @ApiProperty({
    description: 'Indicates whether the referral code is currently active.',
    required: false,
    type: 'boolean',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
