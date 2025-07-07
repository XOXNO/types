import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsNumber, IsBoolean } from 'class-validator';
import { v4 } from 'uuid';

import { EventVoucherDoc } from './event-voucher.doc'; // Assume VoucherDoc is in the relevant module
import { TicketingDataType } from './ticketing-data-type.enum';

export enum ReferralConditionType {
  TicketsSoldCount = 'ticketsSoldCount',
  RevenueCount = 'revenueCount',
}

export class RewardDetails {
  @ApiProperty({
    description: 'Specifies the type of reward given to the referral owner.',
    enum: ['voucher', 'invitation', 'other'],
  })
  rewardType!: 'voucher' | 'invitation' | 'other';

  @ApiProperty({
    description: 'Condition type representing the activation of the voucher',
    enum: ReferralConditionType,
    enumName: 'ReferralConditionType',
  })
  conditionType!: 'ticketsSoldCount' | 'revenueCount';

  @ApiProperty({
    description:
      'Condition (number of successful referrals or revenue threshold) required to earn the reward.',
    type: 'number',
  })
  @IsNumber()
  condition!: number;

  @ApiProperty({
    example: 'RON',
    description: 'Currency type in case of conditionType = revenueCount',
    required: false,
  })
  currency?: string;

  @ApiProperty({
    required: false,
    description:
      'Voucher details that will be issued when the condition is met.',
    type: EventVoucherDoc,
  })
  voucherInfo?: Partial<EventVoucherDoc>; // Use this to define the settings of the voucher to be issued

  constructor(props?: Partial<RewardDetails>) {
    Object.assign(this, props);
  }
}

export class EventReferralConfigDoc {
  @ApiProperty({
    description: 'The type of event data.',
    enum: TicketingDataType,
    enumName: 'TicketingDataType',
    default: TicketingDataType.REFERRAL_CONFIG,
  })
  dataType: TicketingDataType = TicketingDataType.REFERRAL_CONFIG;

  @ApiProperty({
    description: 'Unique identifier for this referral configuration.',
    example: v4(),
  })
  id!: string;

  @ApiProperty({
    description: 'The event this referral configuration is linked to.',
  })
  eventId!: string;

  @ApiProperty({
    description:
      'Indicates if a voucher should be automatically applied as a discount when this referral code is used.',
    type: EventVoucherDoc,
    required: false,
  })
  appliedVoucher?: Partial<EventVoucherDoc>; // This voucher can be automatically applied as a discount for users using the referral code

  @ApiProperty({
    required: false,
    description:
      'Details about the reward issued to the referral owner after a certain number of successful referrals or revenue thresholds.',
    type: RewardDetails,
  })
  rewardDetails?: RewardDetails;

  @ApiProperty({
    description:
      'Indicates whether normal guests can generate and share their unique referral codes for this event.',
    type: 'boolean',
  })
  @IsBoolean()
  isSelfService = false;

  @ApiProperty({
    description: 'Indicates whether the referral program is currently active.',
    type: 'boolean',
  })
  @IsBoolean()
  isActive = true;

  @ApiProperty({
    description: 'Timestamp when the referral configuration was created.',
    example: Math.floor(Date.now() / 1000),
    type: 'integer',
  })
  @IsInt()
  createdAt: number = Math.floor(Date.now() / 1000);

  @ApiProperty({
    description:
      'The address of the user who created this referral configuration.',
  })
  createdBy!: string;

  pk!: string;

  constructor(props?: Partial<EventReferralConfigDoc>) {
    Object.assign(this, props);
    this.id = v4();
    this.pk = this.eventId;
    this.createdAt = Math.floor(Date.now() / 1000);
  }
}
