import { randomBytes } from 'crypto';

import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsInt, IsBoolean, IsString, IsNumber } from 'class-validator';
import { v4 } from 'uuid';

import {
  EventCategory,
  EventSubCategory,
} from '../../../enums/event-category.enum';
import { EventGuestStatus } from '../../../enums/event-guest-status.enum';
import { EventGuestDoc } from './event-guest.doc';
import { EventLocationDto, EventSeoDto } from './event-profile-create.dto';
import { EventUserRoleDoc } from './event-user-role.doc';
import { TicketingDataType } from '../../../enums/ticketing-data-type.enum';
import { createCosmosPaginatedResponse } from '../../cosmos-db-paginated-response.dto';
import { CreatorProfileDoc } from '../user/user-creator-profile.doc';
import {
  Visibility,
  EventTicketQrType,
} from '../../../enums/ticketing-visibility.enum';
export class RegistrationType {
  @ApiProperty({
    enum: Visibility,
    required: true,
    description: 'Visibility of the event registration',
    enumName: 'Visibility',
  })
  @IsEnum(Visibility)
  visibility!: Visibility;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Maximum number of registrations allowed',
  })
  @IsInt()
  maxLimit!: number;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Maximum number of registrations allowed per user',
  })
  @IsInt()
  userLimit!: number;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Current number of tickets sold',
  })
  @IsInt()
  soldCount?: number;

  @ApiProperty({
    type: 'boolean',
    required: true,
    description: 'Whether the event has side events',
  })
  @IsBoolean()
  hasSideEvents!: boolean;

  @ApiProperty({
    type: 'boolean',
    required: false,
    description: 'Whether to show the guest count',
  })
  @IsBoolean()
  showGuestCount?: boolean;

  @ApiProperty({
    type: 'boolean',
    required: true,
    description: 'Whether KYC is required for registration',
  })
  @IsBoolean()
  requireKYC!: boolean;

  @ApiProperty({
    type: 'boolean',
    required: true,
    description: 'Whether the event is refundable',
  })
  @IsBoolean()
  refundable!: boolean;

  @ApiProperty({
    type: 'boolean',
    required: true,
    description: 'Whether to show name with number',
  })
  @IsBoolean()
  nameWithNumber!: boolean;

  @ApiProperty({
    type: 'boolean',
    required: true,
    description: 'Whether bot protection is enabled',
  })
  @IsBoolean()
  botProtection!: boolean;

  @ApiProperty({
    type: 'boolean',
    required: true,
    description: 'Whether the event is published',
  })
  @IsBoolean()
  isPublished!: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Whether the event has a waitlist',
  })
  @IsBoolean()
  hasWaitlist?: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'Whether name is required for registration',
  })
  @IsBoolean()
  requireName!: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'Whether email is required for registration',
  })
  @IsBoolean()
  requireEmail!: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'Whether phone number is required for registration',
  })
  @IsBoolean()
  requirePhoneNumber!: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Whether the event has custom questions',
  })
  @IsBoolean()
  hasCustomQuestions?: boolean;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Email sender for notifications',
  })
  @IsString()
  emailSender?: string;
}

export class PremiumType {
  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'Whether the event is searchable',
  })
  @IsBoolean()
  searchable!: boolean;
}

export class EventGuestProfileSummary {
  @ApiProperty({
    description: 'The address of the guest.',
    example: 'erd1234',
  })
  address!: string;

  @ApiProperty({
    description: 'The profile URL of the guest.',
    example: 'https://example.com/profile.png',
  })
  profile!: string;

  @ApiProperty({
    description: 'The name of the guest.',
    example: 'John Doe',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'The herotag of the guest.',
    example: 'john-doe',
    required: false,
  })
  herotag?: string;
}
export class EventGuestSummary {
  @ApiProperty({
    description: 'Total number of guests.',
    example: 100,
    type: 'integer',
  })
  @IsInt()
  count!: number;

  @ApiProperty({
    description:
      'List of guests with their address, profile, name, and herotag.',
    type: EventGuestProfileSummary,
    isArray: true,
  })
  guests!: EventGuestProfileSummary[];
}

export class EventProfileDoc {
  @ApiProperty({
    description: 'The type of user data.',
    enum: TicketingDataType,
    enumName: 'TicketingDataType',
    default: TicketingDataType.EVENT_PROFILE,
  })
  dataType: TicketingDataType = TicketingDataType.EVENT_PROFILE;

  @ApiProperty({
    description:
      'The time the event was created as a Unix timestamp in seconds.',
    type: 'integer',
  })
  @IsInt()
  createdAt: number = Math.floor(Date.now() / 1000);

  @ApiProperty({
    description: 'Wallet address of the creator of the event.',
  })
  creatorAddress!: string;

  @ApiProperty({ description: 'Title of the event.' })
  title!: string;

  @ApiProperty({
    description: 'Start time of the event as a Unix timestamp in seconds.',
    type: 'integer',
  })
  @IsInt()
  startTime!: number;

  @ApiProperty({
    description: 'End time of the event as a Unix timestamp in seconds.',
    required: true,
    type: 'integer',
  })
  @IsInt()
  endTime!: number;

  @ApiProperty({
    description:
      'URL to the markdown file in Azure storage containing the event description.',
    // default: StaticConfig.getDefaultEventDescription(),
    required: false,
  })
  descriptionUrl?: string;

  @ApiProperty({
    type: EventLocationDto,
    description:
      'Location details including geo points, address, and optional instructions.',
  })
  location!: EventLocationDto;

  @ApiProperty({
    description:
      'Define if the event happens in real life or virtual on Zoom/Meet',
    type: 'boolean',
  })
  @IsBoolean()
  isVirtualEvent!: boolean;

  @ApiProperty({ description: 'Unique slug for the event URL.' })
  slug!: string;

  @ApiProperty({
    description: 'URL to the profile image in Azure storage.',
    // default: StaticConfig.getDefaultProfilePicture(),
  })
  profile!: string;

  @ApiProperty({
    description: 'Category of the event.',
    enum: EventCategory,
    enumName: 'EventCategory',
  })
  category!: EventCategory;

  @ApiProperty({
    description: 'Subcategory of the event.',
    enum: EventSubCategory,
    enumName: 'EventSubCategory',
    required: false,
  })
  subCategory?: string;

  @ApiProperty({
    description: 'URL to the background image in Azure storage, optional.',
    required: false,
  })
  background?: string;

  @ApiProperty({
    description:
      'Registration details such as visibility, max capacity, and ticket limits.',
    type: () => RegistrationType,
  })
  registration!: RegistrationType;

  @ApiProperty({
    description: 'Event premium features',
    type: () => PremiumType,
  })
  premium: PremiumType = {
    searchable: false,
  };

  @ApiProperty({
    description: 'The address of the contract that manages the event.',
    required: false,
  })
  contractAddress?: string;

  @ApiProperty({
    description: 'The NFT collection the event is associated with.',
    required: false,
  })
  collection?: string;

  @ApiProperty({
    type: EventSeoDto,
    example: {},
    required: false,
    description:
      'SEO-related information such as short description, tags, and alternative title.',
  })
  seo?: EventSeoDto;

  @ApiProperty({
    description: 'Automatically generated unique identifier for the event.',
  })
  id: string = v4();

  @ApiProperty({
    description: 'Permissions for the event.',
    required: false,
    type: () => EventUserRoleDoc,
  })
  eventPermissions?: Pick<EventUserRoleDoc, 'role' | 'permissions' | 'endTime'>;

  pk!: string;
  @IsInt()
  _ts!: number;

  constructor(props?: Partial<EventProfileDoc>) {
    Object.assign(this, props);
    // Set the partition key to the data type for now
    this.pk = this.dataType;
    this.premium.searchable = true;
    if (!this.slug) {
      const generateRandomSlug = (length = 8): string => {
        const CHARACTERS =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const CHARACTERS_LENGTH = CHARACTERS.length;
        const randomValues = randomBytes(length);
        let result = '';

        for (let i = 0; i < length; i++) {
          result += CHARACTERS.charAt(randomValues[i] % CHARACTERS_LENGTH);
        }

        return result.toLowerCase();
      };
      this.slug = generateRandomSlug();
    }
  }
}

// Define a class for the startsFrom object
export class EventStartPrice {
  @ApiProperty({
    type: 'number',
    description: 'Starting price of the event ticket.',
  })
  @IsNumber()
  price!: number;

  @ApiProperty({
    type: 'string',
    description: 'Currency of the price.',
    example: 'USD',
  })
  @IsString()
  currency!: string;
}

export class EventProfile extends EventProfileDoc {
  @ApiProperty({
    description: 'Creator profile data including name, profile, and herotag.',
    type: () => CreatorProfileDoc,
    required: false,
  })
  creatorProfile?: CreatorProfileDoc;

  @ApiProperty({
    description: 'Summary of the guests attending the event.',
    required: false,
    type: () => EventGuestSummary,
  })
  guestSummary?: EventGuestSummary;

  @ApiProperty({
    description: 'The starting price of the event, if applicable.',
    required: false,
    type: () => EventStartPrice, // Use the new class here
  })
  startsFrom?: EventStartPrice;

  @ApiProperty({
    description: 'The guest profile of the user.',
    required: false,
    type: () => EventGuestDoc,
  })
  guestProfile?: EventGuestDoc;
}

export class EventProfileQuery extends createCosmosPaginatedResponse(
  EventProfile,
) {}

export class MyEvents {
  @ApiProperty({
    description: 'The number of tickets the user has for the event.',
    example: 1,
    type: 'integer',
  })
  @IsInt()
  ticketCount!: number;

  @ApiProperty({
    description: 'The status of the user for the event.',
    type: String,
    enum: EventGuestStatus,
    enumName: 'EventGuestStatus',
  })
  status!: EventGuestStatus;

  @ApiProperty({
    description: 'The event profile.',
    type: () => EventProfile,
  })
  eventProfile!: EventProfile;
}

export class GetMyEventsQuery extends createCosmosPaginatedResponse(MyEvents) {}

export class BageQRData {
  @ApiProperty({
    description: 'The type of the QR code.',
    example: 'badge',
    enum: EventTicketQrType,
    enumName: 'EventTicketQrType',
  })
  type!: EventTicketQrType;

  @ApiProperty({
    description: 'The data of the QR code.',
    example: 'base64',
  })
  data!: string;
}
