import { ApiProperty } from '@nestjs/swagger';

import { v4 } from 'uuid';

import { NotificationDataType } from '../../enums/notification-data-type.enum';
import {
  PushNotificationType,
  PushNotificationStatus,
} from '../../enums/push-notification.enum';
import { NotificationMetadata } from './notification-template';

class PushNotificationEventDto {
  @ApiProperty({
    description: 'Unique identifier of the event',
    example: 'event-123-456-789',
    type: String,
    required: false,
  })
  eventId?: string;

  @ApiProperty({
    description: 'Title of the event',
    example: 'Summer Music Festival 2024',
    type: String,
    required: false,
  })
  eventTitle?: string;

  @ApiProperty({
    description: 'Profile image URL of the event',
    example: 'https://cdn.xoxno.com/events/summer-fest.jpg',
    type: String,
    required: false,
  })
  eventProfile?: string;

  @ApiProperty({
    description: 'Blockchain address of the event creator',
    example: 'erd1creator123...',
    type: String,
    required: false,
  })
  creatorAddress?: string;

  @ApiProperty({
    description: 'Display name of the event creator',
    example: 'Festival Organizers Inc.',
    type: String,
    required: false,
  })
  creatorName?: string;
}

class PushNotificationTargetingDto {
  @ApiProperty({
    description: 'Type of notification targeting strategy',
    example: PushNotificationType.USER_SPECIFIC,
    enum: PushNotificationType,
    enumName: 'PushNotificationType',
  })
  type!: PushNotificationType;

  @ApiProperty({
    description: 'Azure Notification Hub tag expression for targeting',
    example: '(tag:event:123 && tag:status:approved) || tag:creator:456',
    type: String,
    required: false,
  })
  tagExpression?: string;

  @ApiProperty({
    description: 'List of specific Firebase UIDs to target',
    example: ['firebase-uid-123', 'firebase-uid-456'],
    type: [String],
    required: false,
  })
  targetUsers?: string[];

  @ApiProperty({
    description: 'List of blockchain addresses to target',
    example: ['erd1abc...', 'erd1def...'],
    type: [String],
    required: false,
  })
  targetAddresses?: string[];

  @ApiProperty({
    description: 'Total number of recipients targeted',
    example: 150,
    type: Number,
    required: false,
  })
  recipientCount?: number;
}

export class PushNotificationDoc {
  @ApiProperty({
    description: 'Document type identifier for Cosmos DB',
    example: NotificationDataType.PushNotification,
    enum: NotificationDataType,
    enumName: 'NotificationDataType',
  })
  dataType = NotificationDataType.PushNotification;

  @ApiProperty({
    description: 'Title of the push notification',
    example: '🎉 Event Registration Approved!',
    type: String,
  })
  title!: string;

  @ApiProperty({
    description: 'Body text of the push notification',
    example: 'You have been approved for the "Summer Music Festival" event!',
    type: String,
  })
  message!: string;

  @ApiProperty({
    description: 'URL to an image to display with the notification',
    example: 'https://cdn.xoxno.com/notifications/event-banner.jpg',
    type: String,
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    enum: PushNotificationType,
    enumName: 'PushNotificationType',
  })
  notificationType!: PushNotificationType;

  @ApiProperty({
    enum: PushNotificationStatus,
    enumName: 'PushNotificationStatus',
  })
  status: PushNotificationStatus = PushNotificationStatus.PENDING;

  @ApiProperty({
    description: 'Firebase UID of the notification owner (recipient)',
    example: 'firebase-uid-123456789',
    type: String,
  })
  owner!: string;

  @ApiProperty({
    description: 'Blockchain address of the notification sender',
    example: 'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th',
    type: String,
  })
  senderAddress!: string;

  @ApiProperty({
    description: 'Display name of the notification sender',
    example: 'John Doe',
    type: String,
    required: false,
  })
  senderName?: string;

  @ApiProperty({ type: () => PushNotificationEventDto, required: false })
  event?: PushNotificationEventDto;

  @ApiProperty({ type: () => PushNotificationTargetingDto })
  targeting!: PushNotificationTargetingDto;

  @ApiProperty({
    description: 'Whether the notification has been read by the recipient',
    example: false,
    type: Boolean,
    default: false,
  })
  isRead = false;

  @ApiProperty({
    description: 'Unix timestamp when the notification was created',
    example: 1704067200,
    type: Number,
  })
  timestamp!: number;

  @ApiProperty({
    description:
      'Unix timestamp when the notification was delivered to the device',
    example: 1704067300,
    type: Number,
    required: false,
  })
  deliveredAt?: number;

  @ApiProperty({
    description: 'Unix timestamp when the notification was clicked/opened',
    example: 1704067400,
    type: Number,
    required: false,
  })
  clickedAt?: number;

  @ApiProperty({
    description: 'Sound to play when the notification is received',
    example: 'default',
    type: String,
    required: false,
  })
  sound?: string;

  @ApiProperty({
    description: 'Badge count to display on the app icon',
    example: 1,
    type: Number,
    required: false,
  })
  badge?: number;

  @ApiProperty({ type: () => Object, required: false })
  appMetadata?: NotificationMetadata;

  @ApiProperty({
    description: 'Unique identifier for the notification document',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
    required: false,
  })
  id?: string;

  @ApiProperty({
    description: 'Partition key for Cosmos DB (owner Firebase UID)',
    example: 'firebase-uid-123456789',
    type: String,
    required: false,
  })
  pk?: string;

  @ApiProperty({
    description: 'Cosmos DB timestamp (seconds since epoch)',
    example: 1704067200,
    type: Number,
    required: false,
  })
  _ts?: number;

  constructor(props?: Partial<PushNotificationDoc>) {
    Object.assign(this, props);

    this.id = v4();
    this.pk = this.owner;
    this.timestamp = Math.floor(Date.now() / 1000);
  }
}

export class PushNotificationResponse {
  @ApiProperty({ type: PushNotificationDoc, isArray: true })
  resources!: PushNotificationDoc[];

  @ApiProperty({ type: Boolean })
  hasMoreResults!: boolean;
}

export class PushNotificationCountResponse {
  @ApiProperty({ type: Number })
  count!: number;
}
