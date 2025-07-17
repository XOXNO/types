import { ApiProperty } from '@nestjs/swagger';

import { v4 } from 'uuid';

import { NotificationDataType } from '../../enums/notification-data-type.enum';
import {
  PushNotificationType,
  PushNotificationStatus,
} from '../../enums/push-notification.enum';
import { NotificationMetadata } from './notification-template';

class PushNotificationEventDto {
  @ApiProperty({ required: false })
  eventId?: string;

  @ApiProperty({ required: false })
  eventTitle?: string;

  @ApiProperty({ required: false })
  eventProfile?: string;

  @ApiProperty({ required: false })
  creatorAddress?: string;

  @ApiProperty({ required: false })
  creatorName?: string;
}

class PushNotificationTargetingDto {
  @ApiProperty({
    enum: PushNotificationType,
    enumName: 'PushNotificationType',
  })
  type!: PushNotificationType;

  @ApiProperty({ required: false })
  tagExpression?: string;

  @ApiProperty({ required: false, type: [String] })
  targetUsers?: string[];

  @ApiProperty({ required: false, type: [String] })
  targetAddresses?: string[];

  @ApiProperty({ required: false })
  recipientCount?: number;
}

export class PushNotificationDoc {
  @ApiProperty()
  dataType: string = NotificationDataType.PushNotification;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  message!: string;

  @ApiProperty({ required: false })
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

  @ApiProperty()
  owner!: string;

  @ApiProperty()
  senderAddress!: string;

  @ApiProperty({ required: false })
  senderName?: string;

  @ApiProperty({ type: () => PushNotificationEventDto, required: false })
  event?: PushNotificationEventDto;

  @ApiProperty({ type: () => PushNotificationTargetingDto })
  targeting!: PushNotificationTargetingDto;

  @ApiProperty()
  isRead = false;

  @ApiProperty()
  timestamp!: number;

  @ApiProperty({ required: false })
  deliveredAt?: number;

  @ApiProperty({ required: false })
  clickedAt?: number;

  @ApiProperty({ required: false })
  sound?: string;

  @ApiProperty({ required: false })
  badge?: number;

  @ApiProperty({ type: () => Object, required: false })
  appMetadata?: NotificationMetadata;

  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty({ required: false })
  pk?: string;

  @ApiProperty({ required: false })
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
