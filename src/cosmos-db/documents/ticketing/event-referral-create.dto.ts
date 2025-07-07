import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class EventReferralCreateDto {
  @ApiProperty({
    description: 'The code shared by the referral owner.',
  })
  @IsString()
  referralCode!: string;

  @ApiProperty({
    description: 'The ID of the referral configuration this referral follows.',
  })
  @IsString()
  referralConfigId!: string;
}
