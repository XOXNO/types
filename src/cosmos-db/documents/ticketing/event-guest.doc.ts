import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { IsBoolean, IsInt } from 'class-validator';
import { v4 } from 'uuid';

import { EventGuestStatus } from '../../../enums/event-guest-status.enum';
import { TicketingDataType } from '../../../enums/ticketing-data-type.enum';
import { createCosmosPaginatedResponse } from '../../cosmos-db-paginated-response.dto';
import { ShortNftEventDoc } from '../short/short-nft-event-doc';
import { TicketProfileSummary } from './event-ticket-profile.doc';

export class EventGuestCheckIn {
  @ApiProperty({
    description: 'Unique identifier for the ticket type.',
    example: v4(),
    type: String,
  })
  ticketId!: string;

  @ApiProperty({
    description: 'Profile of the ticket.',
    required: false,
    type: () => TicketProfileSummary,
  })
  ticketProfile?: TicketProfileSummary;

  @ApiProperty({
    description: 'Status of check-in.',
    example: true,
    type: 'boolean',
  })
  @IsBoolean()
  isCheckIn = false;

  @ApiProperty({
    description: 'Indicates whether the ticket is free.',
    example: true,
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  freeTicket = false;

  @ApiProperty({
    description: 'Timestamp for when the ticket was received by the guest.',
    example: Math.floor(Date.now() / 1000),
    type: 'integer',
  })
  @IsInt()
  receivedAt!: number;

  @ApiProperty({
    description: 'Invitation ID for the ticket',
    required: false,
    example: v4(),
    type: String,
  })
  invitationId?: string;

  @ApiProperty({
    description: 'Timestamp of check-in.',
    required: false,
    example: Math.floor(Date.now() / 1000),
    type: 'integer',
  })
  @IsInt()
  timestamp?: number;

  @ApiProperty({
    description: 'Quantity of tickets.',
    required: false,
    example: 1,
    type: 'integer',
  })
  quantity?: number;

  @ApiProperty({
    description: 'Transaction ID for the ticket.',
    required: false,
    example: v4(),
    type: String,
  })
  transactionId?: string;
}

export class EventGuestCheckInHydrated extends EventGuestCheckIn {
  @ApiProperty({
    description: 'NFT associated with the ticket.',
    required: false,
    type: () => ShortNftEventDoc,
  })
  nft?: ShortNftEventDoc;
}

class EventGuestRegistration {
  @ApiProperty({
    description: 'Email address.',
    required: false,
    type: String,
  })
  email?: string;

  @ApiProperty({
    description: 'Name of the guest',
    type: String,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Phone number of the guest',
    type: String,
    required: false,
  })
  phone?: string;
}

class EventGuestBilling {
  @ApiProperty({
    description: 'Indicates whether the guest is a company.',
    type: 'boolean',
  })
  @IsBoolean()
  isCompany!: boolean;

  @ApiProperty({ description: 'Name of the company.', type: String })
  name!: string;

  @ApiProperty({
    description: 'Company registration number.',
    type: String,
    required: false,
  })
  companyRegistrationNumber?: string;

  @ApiProperty({
    description: 'Company VAT number.',
    required: false,
    type: String,
  })
  companyVatNumber?: string;

  @ApiProperty({ description: 'Email address.', type: String })
  email!: string;

  @ApiProperty({ description: 'Country', type: String })
  country!: string;

  @ApiProperty({ description: 'City', type: String })
  city!: string;

  @ApiProperty({
    description: 'Address line 1',
    type: String,
  })
  address1!: string;

  @ApiProperty({
    description: 'Address line 2',
    required: false,
    type: String,
  })
  address2?: string;

  @ApiProperty({
    description: 'Postal code',
    required: false,
    type: String,
  })
  postalCode?: string;
}

export class EventGuestDoc {
  @ApiProperty({
    description: 'The type of document data.',
    enum: TicketingDataType,
    enumName: 'TicketingDataType',
    default: TicketingDataType.EVENT_GUEST,
  })
  dataType: TicketingDataType = TicketingDataType.EVENT_GUEST;

  @ApiProperty({
    description: 'Guest wallet address.',
    type: String,
  })
  wallet!: string;

  @ApiProperty({
    description: 'Event ID that the guest is attending.',
    example: 'event123',
    type: String,
  })
  eventId!: string;

  @ApiProperty({
    description:
      'Object with dynamic keys, each representing a ticket for the event. The value is an object with check-in status and timestamps.',
    example: {
      key1: {
        isCheckIn: true,
        timestamp: 1724089378,
        receivedAt: 1724089378,
      },
      key2: {
        isCheckIn: false,
        timestamp: 1724089379,
        receivedAt: 1724089379,
      },
    },
    type: 'object',
    additionalProperties: {
      $ref: getSchemaPath(EventGuestCheckInHydrated),
    },
  })
  ticket: Record<string, EventGuestCheckInHydrated> = {};

  @ApiProperty({
    description:
      'Indicates whether the guest has filled out the questionnaire.',
    example: true,
    type: 'boolean',
  })
  @IsBoolean()
  questionnaireFilled = false;

  @ApiProperty({
    description: 'Data from the guest registration form.',
    required: false,
    type: () => EventGuestRegistration,
  })
  registration?: EventGuestRegistration;

  @ApiProperty({
    description: 'Data from the guest billing form.',
    required: false,
    type: () => EventGuestBilling,
  })
  billing?: EventGuestBilling;

  @ApiProperty({
    description: 'Current status of the guest document',
    example: 'pending',
    type: String,
    enum: EventGuestStatus,
    enumName: 'EventGuestStatus',
  })
  status: EventGuestStatus = EventGuestStatus.PENDING;

  @ApiProperty({
    description: 'Timestamp of guest creation.',
    example: Math.floor(Date.now() / 1000),
    type: 'integer',
  })
  @IsInt()
  createdAt: number = Math.floor(Date.now() / 1000);

  @ApiProperty({
    description: 'Invitation ID for the guest',
    required: false,
    example: v4(),
    type: String,
  })
  invitationId?: string;

  // @ApiProperty({
  //   description: 'Answers to the questionnaire',
  //   required: false,
  // })
  // questionAnswers?: Record<string, string>;

  @ApiProperty({
    description: 'Custom metadata for the guest',
    required: false,
  })
  metadata?: Record<string, unknown>;

  @ApiProperty({
    description: 'Unique identifier for the document.',
    example: 'guest123',
    type: String,
    required: false,
  })
  id?: string;

  @ApiProperty({
    description: 'Partition key for the document.',
    example: 'event123',
    type: String,
    required: false,
  })
  pk?: string;

  @ApiProperty({
    description: 'Timestamp for document in Cosmos DB.',
    type: 'integer',
  })
  _ts!: number;

  //TODO: set TTL if status is pending
  @ApiProperty({
    description: 'Time to live in seconds for the document.',
    required: false,
    type: 'integer',
  })
  ttl?: number;

  constructor(props?: Partial<EventGuestDoc>) {
    Object.assign(this, props);
    this.id = `${this.wallet}_${this.eventId}`;
    this.pk = this.eventId;
  }
}

export class EventGuestProfile extends EventGuestDoc {
  @ApiProperty({
    description: 'Guest profile picture.',
    type: String,
  })
  profile!: string;

  @ApiProperty({
    description: 'Guest wallet herotag.',
    type: String,
  })
  herotag!: string;
}

export class EventGuestProfileQuery extends createCosmosPaginatedResponse(
  EventGuestProfile,
) {}

export class EventGuestExport {
  @ApiProperty({
    description: 'Guest wallet address.',
    type: String,
  })
  wallet!: string;

  @ApiProperty({
    description: 'Guest email address.',
    required: false,
  })
  email!: string;

  @ApiProperty({
    description: 'Guest first name.',
    required: false,
  })
  name!: string;

  @ApiProperty({
    description: 'Guest last name.',
    required: false,
  })
  phone!: string;

  @ApiProperty({
    description: 'Guest status',
    type: String,
    enum: EventGuestStatus,
    enumName: 'EventGuestStatus',
  })
  status!: EventGuestStatus;

  [key: string]: string;
}
