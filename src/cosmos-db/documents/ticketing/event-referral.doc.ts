import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsInt, IsString } from 'class-validator';
import { v4 } from 'uuid';

import { TicketingDataType } from '../../../enums/ticketing-data-type.enum';

export class EventReferralDoc {
  @ApiProperty({
    description: 'The type of event data.',
    enum: TicketingDataType,
    enumName: 'TicketingDataType',
    default: TicketingDataType.REFERRAL_CODE,
  })
  dataType: TicketingDataType = TicketingDataType.REFERRAL_CODE;

  @ApiProperty({
    description: 'Unique identifier for this referral.',
    example: v4(),
  })
  id!: string;

  pk!: string;

  @ApiProperty({ description: 'The code shared by the referral owner.' })
  @IsString()
  referralCode!: string;

  @ApiProperty({
    description: 'The user ID of the referral owner.',
    required: false,
  })
  ownerId?: string;

  @ApiProperty({
    description: 'The event this referral applies to.',
  })
  eventId!: string;

  @ApiProperty({
    description: 'The ID of the referral configuration this referral follows.',
  })
  @IsString()
  referralConfigId!: string;

  @ApiProperty({
    description: 'Count of successful paid tickets with referrals.',
    type: 'integer',
  })
  @IsInt()
  successfulReferrals = 0;

  @ApiProperty({
    description: 'Timestamp when the referral was created.',
    example: Math.floor(Date.now() / 1000),
    type: 'integer',
  })
  @IsInt()
  createdAt: number = Math.floor(Date.now() / 1000);

  @ApiProperty({
    description: 'Indicates whether the referral code is currently active.',
    type: 'boolean',
  })
  @IsBoolean()
  isActive = true;

  constructor(props?: Partial<EventReferralDoc>) {
    Object.assign(this, props);

    this.id = `${this.eventId}_${this.referralCode}_${TicketingDataType.REFERRAL_CODE}`;
    this.pk = this.eventId;
  }
}
