import { ApiProperty, PickType } from '@nestjs/swagger';

import {
  IsInt,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
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
  @IsUUID()
  eventId!: string;

  @ApiProperty({
    description: 'Name of the ticket type (e.g., General, VIP).',
    required: false,
  })
  @Length(3, 30)
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Description of the ticket type.',
    required: false,
  })
  @Length(3, 300)
  @IsString()
  description?: string;

  @ApiProperty({
    description:
      'URL of the image that will be used as the NFT representing this ticket type.',
    required: false,
  })
  @IsString()
  profile: string = 'https://media.xoxno.com/utils/defaultProfilePic.webp';

  @ApiProperty({
    required: false,
    description:
      'Royalties set for the mint of this specific NFT ticket type, expressed as a percentage.',
    example: 5, // represents 5% royalties
    type: 'number',
  })
  @IsNumber()
  @Min(0)
  @Max(90)
  royalties = 0;

  @ApiProperty({
    required: false,
    description:
      'Optional color code for the badge or wristband to be used during check-in.',
  })
  @IsString()
  @Length(3, 30)
  @Matches(/^#([0-9A-F]{3}){1,2}$/i, {
    message: 'badgeColor must be a valid hex color',
  })
  badgeColor?: string; // Example: '#FF5733' (Hex color code)

  @ApiProperty({
    required: false,
    description: 'Other characteristics specific to this ticket type.',
  })
  @IsObject()
  characteristics?: Record<string, string | number>; // Additional properties like seating, access levels, etc.

  @ApiProperty({
    description:
      'Optional maximum number of tickets that can be minted for this ticket type.',
    example: 1000,
    required: false,
    type: 'integer',
  })
  @IsInt()
  @Min(0)
  maxLimit = 0; // Maximum tickets that can be sold for this ticket type - 0 means unlimited

  @ApiProperty({
    description:
      'Limit on the number of tickets a single user can buy for this type.',
    type: 'integer',
  })
  @IsInt()
  @Min(0)
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

  @ApiProperty({
    description: 'Partition key for Cosmos DB document.',
    type: String,
    required: false,
  })
  pk?: string;

  @ApiProperty({
    description: 'Timestamp for document in Cosmos DB.',
    type: 'integer',
    required: false,
  })
  _ts?: number;

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
