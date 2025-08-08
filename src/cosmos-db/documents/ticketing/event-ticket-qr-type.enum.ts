import { ApiProperty } from '@nestjs/swagger';

import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  EventScanMessage,
  EventScanStatus,
} from '../../../enums/event-scan-status.enum';
import { EventTicketQrType } from '../../../enums/ticketing-visibility.enum';
import { NftDocHydrated } from '../token/nft-details.doc';
import { EventGuestProfile } from './event-guest.doc';
import { EventInvitation } from './event-invitation.doc';
import { TicketProfileSummary } from './event-ticket-profile.doc';

export class TicketSelection {
  @ApiProperty({
    description: 'Ticket Profile ID',
    type: String,
  })
  @IsString()
  identifier!: string;

  @ApiProperty({
    description: 'Ticket Profile ID',
    type: String,
  })
  @IsString()
  ticketId!: string;
  @ApiProperty({
    description: 'Ticket Profile quantity',
    type: 'integer',
  })
  @IsNumber()
  quantity!: number;

  @ApiProperty({
    description: 'Ticket Profile',
    type: TicketProfileSummary,
    required: false,
  })
  ticketProfile?: TicketProfileSummary;
}

export class TicketValidationResult {
  @ApiProperty({
    description: 'Staus of the scan',
    enum: EventScanStatus,
    enumName: 'EventScanStatus',
  })
  status!: EventScanStatus;
  @ApiProperty({
    description: 'QR Code type',
    enum: EventTicketQrType,
    enumName: 'EventTicketQrType',
  })
  type!: EventTicketQrType;
  @ApiProperty({
    description: 'QR Code type',
    enum: EventScanMessage,
    enumName: 'EventScanMessage',
  })
  message!: EventScanMessage;
  @ApiProperty({
    description: 'GuestDoc profile extended',
    type: EventGuestProfile,
    required: false,
  })
  guest?: EventGuestProfile;
  @ApiProperty({
    description: 'InvitationDoc profile',
    type: EventInvitation,
    required: false,
  })
  invitation?: EventInvitation;
  @ApiProperty({
    description: 'NFTs used for check in, if any',
    type: [NftDocHydrated],
    required: false,
  })
  nfts?: NftDocHydrated[];

  @ApiProperty({
    description: 'Tickets to select from when required for bulk scan',
    type: [TicketSelection],
    required: false,
  })
  availableTickets?: TicketSelection[];
}
export class QRBody {
  @ApiProperty({
    description: 'QR Type',
    enum: EventTicketQrType,
    enumName: 'EventTicketQrType',
  })
  @IsEnum(EventTicketQrType)
  type!: EventTicketQrType;

  @IsString()
  @ApiProperty({ description: 'Encrypted QR data' })
  data!: string;
}

export class EventCheckInQR {
  @IsDefined()
  @ApiProperty({ description: 'User wallet address', type: QRBody })
  qr!: QRBody;

  @ApiProperty({
    description: 'Selected Tickets',
    type: TicketProfileSummary,
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsOptional()
  tickets?: TicketProfileSummary[];
}

export class BadgeDecryptedData {
  @ApiProperty({
    description: 'User address',
    type: String,
  })
  @IsString()
  address!: string;

  @ApiProperty({
    description: 'Created timestamp',
    type: 'integer',
  })
  @IsString()
  createdAt!: number;

  @ApiProperty({
    description: 'Expires at timestamp',
    type: 'integer',
  })
  @IsString()
  expiresAt!: number;
}
