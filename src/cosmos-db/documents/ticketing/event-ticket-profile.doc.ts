import { ApiProperty, PickType } from '@nestjs/swagger';

import { IsInt, IsNumber } from 'class-validator';
import { v4 } from 'uuid';

import { TicketingDataType } from '../../../enums/ticketing-data-type.enum';

export class EventTicketProfileDoc {
  @ApiProperty({
    description: 'The type of event data.',
    enum: TicketingDataType,
    enumName: 'TicketingDataType',
  })
  dataType: TicketingDataType = TicketingDataType.EVENT_TICKET_PROFILE;

  @ApiProperty({
    description: 'ID of the event this ticket type is associated with.',
  })
  eventId!: string;

  @ApiProperty({
    description: 'Name of the ticket type (e.g., General, VIP).',
  })
  name!: string;

  @ApiProperty({
    description: 'Description of the ticket type.',
  })
  description!: string;

  @ApiProperty({
    description:
      'URL of the image that will be used as the NFT representing this ticket type.',
  })
  profile!: string;

  @ApiProperty({
    required: false,
    description:
      'Royalties set for the mint of this specific NFT ticket type, expressed as a percentage.',
    example: 5, // represents 5% royalties
    type: 'number',
  })
  @IsNumber()
  royalties = 0;

  @ApiProperty({
    required: false,
    description:
      'Optional color code for the badge or wristband to be used during check-in.',
  })
  badgeColor?: string; // Example: '#FF5733' (Hex color code)

  @ApiProperty({
    required: false,
    description: 'Other characteristics specific to this ticket type.',
  })
  characteristics?: Record<string, string | number>; // Additional properties like seating, access levels, etc.

  @ApiProperty({
    description:
      'Optional maximum number of tickets that can be minted for this ticket type.',
    example: 1000,
    required: false,
    type: 'integer',
  })
  @IsInt()
  maxLimit = 0; // Maximum tickets that can be sold for this ticket type - 0 means unlimited

  @ApiProperty({
    description:
      'Limit on the number of tickets a single user can buy for this type.',
    type: 'integer',
  })
  @IsInt()
  userLimit = 0;

  @ApiProperty({
    description: 'The current count of sold tickets',
    example: 1000,
    required: true,
    type: 'integer',
  })
  @IsInt()
  soldCount = 0;

  @ApiProperty({
    description: 'Timestamp when the ticket type was created.',
    example: Math.floor(Date.now() / 1000),
    type: 'integer',
  })
  @IsInt()
  createdAt: number = Math.floor(Date.now() / 1000);

  @ApiProperty({
    description: 'Unique identifier for this ticket type.',
    example: v4(),
  })
  id: string = v4();

  pk!: string;
  @IsInt()
  _ts!: number;

  constructor(props?: Partial<EventTicketProfileDoc>) {
    Object.assign(this, props);
    this.pk = this.eventId;
  }
}

export class TicketProfileSummary extends PickType(EventTicketProfileDoc, [
  'name',
  'description',
  'profile',
  'badgeColor',
  'characteristics',
] as const) {
  @ApiProperty({
    description: 'The unique identifier for the ticket type.',
    example: v4(),
    required: false,
  })
  ticketId?: string;

  @ApiProperty({
    description: 'The number of tickets for this type.',
    example: 100,
    required: false,
    type: 'integer',
  })
  @IsInt()
  quantity?: number;
}
