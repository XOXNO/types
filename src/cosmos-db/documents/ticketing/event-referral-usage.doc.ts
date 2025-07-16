import { ApiProperty } from '@nestjs/swagger';

import { v4 as uuidv4 } from 'uuid';

import { TicketingDataType } from '../../../enums/ticketing-data-type.enum';

export class EventReferralUsageDoc {
  @ApiProperty({
    description: 'The type of event data.',
    enum: TicketingDataType,
    enumName: 'TicketingDataType',
    default: TicketingDataType.REFERRAL_USAGE,
  })
  dataType: TicketingDataType = TicketingDataType.REFERRAL_USAGE;

  @ApiProperty({
    description: 'Unique identifier for this referral usage.',
    example: uuidv4(),
  })
  id: string = uuidv4();

  @ApiProperty({ description: 'The ID of the referral being used.' })
  referralId!: string;

  @ApiProperty({
    description: 'The user ID of the person who used the referral code.',
  })
  userId!: string;

  @ApiProperty({ description: 'The event ID this usage is linked to.' })
  eventId!: string;

  @ApiProperty({
    description: 'The ticket ID purchased using the referral code.',
  })
  ticketId!: string;

  @ApiProperty({
    description: 'The number of tickets sold in this referral usage.',
  })
  ticketsSold!: number;

  @ApiProperty({
    description: 'The total amount spent during this referral usage.',
  })
  totalAmountSpent!: number;

  @ApiProperty({
    description: 'The currency used for the transaction.',
    example: 'USD',
  })
  currency!: string;

  @ApiProperty({
    description: 'The ID of the voucher applied during this purchase, if any.',
    required: false,
  })
  appliedVoucherId?: string; // Refers to the VoucherDoc ID

  @ApiProperty({
    description: 'Timestamp when the referral was used.',
    example: Math.floor(Date.now() / 1000),
  })
  createdAt: number = Math.floor(Date.now() / 1000);

  @ApiProperty({
    description:
      'Indicates whether the referral usage led to a successful transaction.',
  })
  isSuccessful = false;

  constructor(props?: Partial<EventReferralUsageDoc>) {
    Object.assign(this, props);
  }
}
