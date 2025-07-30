import { ApiProperty } from '@nestjs/swagger';
import { NotificationDataType } from '../../../enums/notification-data-type.enum';
import { NotificationAssetType } from '../../../enums/notification-asset-type.enum';
import { MarketplaceActivity } from '../../../enums/marketplace-activity.enum';

export class NotificationDoc {
  @ApiProperty({
    description: 'Data type identifier for notification',
    enum: NotificationDataType,
    example: NotificationDataType.Notification,
    default: NotificationDataType.Notification,
  })
  dataType = NotificationDataType.Notification;
  @ApiProperty({
    description: 'Transaction hash',
    example: '0x123...',
  })
  txHash!: string;
  @ApiProperty({
    description: 'Source of the notification',
    example: 'xoxno',
  })
  source!: string;
  @ApiProperty({
    description: 'Type of marketplace activity',
    enum: MarketplaceActivity,
    example: MarketplaceActivity.TRADE,
  })
  activityType!: MarketplaceActivity;
  @ApiProperty({
    description: 'Owner address',
    example: 'erd1...',
  })
  owner!: string;
  @ApiProperty({
    description: 'Optional notification message',
    example: 'Your NFT has been sold',
    required: false,
  })
  message?: string;
  @ApiProperty({
    description: 'Asset information',
  })
  asset!: NotificationAsset;
  @ApiProperty({
    description: 'Activity details',
  })
  activity!: NotificationActivity;
  @ApiProperty({
    description: 'Whether the notification has been read',
    example: false,
    default: false,
  })
  isRead: boolean = false;
  @ApiProperty({
    description: 'Unix timestamp of the notification',
    example: 1640995200,
  })
  timestamp!: number;
  @ApiProperty({
    description: 'Document ID',
    example: 'notification-123',
    required: false,
  })
  id?: string;
  @ApiProperty({
    description: 'Partition key for Cosmos DB',
    example: 'erd1...',
    required: false,
  })
  pk?: string;
  @ApiProperty({
    description: 'Cosmos DB timestamp',
    example: 1640995200,
    required: false,
  })
  _ts?: number;

  constructor(props?: Partial<NotificationDoc>) {
    Object.assign(this, props);
    this.pk = this.owner;
  }
}

export type NotificationAsset = {
  type: NotificationAssetType;
  collection?: string;
  identifier?: string;
  address?: string; // for user related notifications like deposit or new message
  name?: string; // nft name | collection name | user name
  url?: string;
};

export type NotificationActivity = {
  price?: number; // for auctions or offers, or deposit balance
  paymentToken?: string;
  quantity?: number;
  buyer?: string;
  seller?: string;
  previousBidder?: string; // for xoxno outbid event
  deadline?: number;
  unreadCount?: number;
};
