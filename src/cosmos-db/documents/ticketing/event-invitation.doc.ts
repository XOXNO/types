import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';
import { v4 } from 'uuid';

import { EventInvitationStatus } from '../../../enums/event-invitation-status.enum';
import { TicketingDataType } from '../../../enums/ticketing-data-type.enum';
import { createCosmosPaginatedResponse } from '../../cosmos-db-paginated-response.dto';
import { TicketProfileSummary } from './event-ticket-profile.doc';
import { Type } from 'class-transformer';
import { TicketsType } from './event-ticket-qr-type.enum';

export class EventInvitationDoc {
  @ApiProperty({
    description: 'The type of ticket data.',
    enum: TicketingDataType,
    enumName: 'TicketingDataType',
    default: TicketingDataType.INVITATION,
    type: String,
  })
  dataType: TicketingDataType = TicketingDataType.INVITATION;

  @ApiProperty({
    description: 'The ID of the event.',
    example: 'event123',
    type: String,
  })
  eventId!: string;

  @ApiProperty({
    description:
      'The name of the person associated with the ticket invitation.',
    example: 'John Doe',
    type: String,
    required: false,
  })
  @Length(1, 30)
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The email associated with the ticket invitation.',
    example: 'example@example.com',
    type: String,
    required: false,
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Phone number of the guest',
    type: String,
    required: false,
  })
  phone?: string;

  @ApiProperty({
    description: 'List of ticket types with their IDs and quantities.',
    type: () => TicketProfileSummary,
    isArray: true,
    example: [{ ticketId: 'VIP123', quantity: 2 }],
  })
  @Type(() => TicketProfileSummary)
  @ValidateNested({ each: true })
  tickets: TicketsType[] | TicketProfileSummary[] = [];

  @ApiProperty({
    description: 'The start timestamp of the invitation.',
    example: 1627849200,
    type: 'integer',
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  startTime: number = Math.floor(Date.now() / 1000);

  @ApiProperty({
    description: 'The expiry timestamp of the invitation.',
    example: 1627852800,
    type: 'integer',
  })
  @IsInt()
  @Min(Math.floor(Date.now() / 1000) + 86400)
  @IsOptional()
  endTime: number = Math.floor(Date.now() / 1000) + 86400 * 7;

  @ApiProperty({
    description: 'The timestamp when the ticket invitation was created.',
    example: Math.floor(Date.now() / 1000),
    type: 'integer',
  })
  @IsInt()
  createdAt: number = Math.floor(Date.now() / 1000);

  @ApiProperty({
    description: 'Indicates if the ticket has been claimed.',
    example: false,
    type: 'boolean',
  })
  @IsBoolean()
  isClaimed = false;

  @ApiProperty({
    description: 'Indicates if the ticket has been scanned.',
    example: false,
    type: 'boolean',
  })
  @IsBoolean()
  isUsed = false;

  @ApiProperty({
    description: 'The status of the ticket invitation.',
    enum: EventInvitationStatus,
    default: EventInvitationStatus.PENDING,
    type: String,
    enumName: 'EventInvitationStatus',
  })
  status: EventInvitationStatus = EventInvitationStatus.PENDING;

  @ApiProperty({
    description: 'The timestamp when the ticket was claimed.',
    example: 0,
    type: 'integer',
  })
  @IsInt()
  claimedAt = 0;

  @ApiProperty({
    description: 'The identifier of the person who claimed the ticket.',
    example: 'erd138ddea4xdtlm3mtnayssfcpyx6p0etmnz32s874v8m7y0hy3shsnnr4mz',
    required: false,
    type: String,
  })
  claimedBy?: string;

  @ApiProperty({
    description: 'The transaction hash associated with the ticket claim.',
    example: 'f8e8ad01519a43aa7c629155d35f505a17541e3ceb779e7ed728633764354faa',
    required: false,
    type: String,
  })
  txHash?: string;

  @ApiProperty({
    description: 'The unique identifier for the ticket invitation.',
    example: v4(),
    type: String,
  })
  id: string = v4();

  @ApiProperty({
    description: 'The partition key for the ticket invitation.',
    example: 'event123',
    type: String,
    required: false,
  })
  pk!: string;

  @IsInt()
  _ts!: number;

  constructor(props?: Partial<EventInvitationDoc>) {
    Object.assign(this, props);
    this.pk = this.eventId;
  }
}

export class EventInvitation extends EventInvitationDoc {
  @ApiProperty({
    description:
      'The profile image of the person associated with the ticket invitation.',
    type: String,
    required: false,
  })
  profile?: string;

  @ApiProperty({
    description:
      'The herotag of the person associated with the ticket invitation.',
    type: String,
    required: false,
  })
  herotag?: string;
}

export class EventInvitationQuery extends createCosmosPaginatedResponse(
  EventInvitation,
) {}
