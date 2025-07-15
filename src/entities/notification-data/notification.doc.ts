import { ApiProperty } from '@nestjs/swagger';

import { v4 } from 'uuid';

import { NotificationAssetType } from './notification-asset-type.enum';
import { NotificationDataType } from './notification-data-type.enum';
import { MarketplaceActivity } from '../../requests/nft-activity-data/marketplace-activity.enum';

class NotificationAssetDto {
  @ApiProperty({
    enum: NotificationAssetType,
    enumName: 'NotificationAssetType',
  })
  type!: NotificationAssetType;

  @ApiProperty({ required: false })
  collection?: string;

  @ApiProperty({ required: false })
  identifier?: string;

  @ApiProperty({ required: false })
  address?: string; // for user related notifications like deposit or new message

  @ApiProperty({ required: false })
  name?: string; // nft name | collection name | user name

  @ApiProperty({ required: false })
  url?: string; // nft url | collection profile | user profile
}

class NotificationActivityDto {
  @ApiProperty({ required: false })
  price?: number; // for auctions or offers, or deposit balance

  @ApiProperty({ required: false })
  paymentToken?: string;

  @ApiProperty({ required: false })
  quantity?: number;

  @ApiProperty({ required: false })
  buyer?: string;

  @ApiProperty({ required: false })
  seller?: string;

  @ApiProperty({ required: false })
  previousBidder?: string; // for xoxno outbid event

  @ApiProperty({ required: false })
  deadline?: number; // for offers or auctions(maybe not needed)
}

export class NotificationDoc {
  @ApiProperty()
  dataType: string = NotificationDataType.Notification;

  @ApiProperty()
  txHash!: string;

  @ApiProperty()
  source!: string;

  @ApiProperty({
    enum: MarketplaceActivity,
    enumName: 'MarketplaceActivity',
  })
  activityType!: MarketplaceActivity;

  @ApiProperty()
  owner!: string;

  @ApiProperty({ required: false })
  message?: string;

  @ApiProperty({ type: () => NotificationAssetDto })
  asset!: NotificationAssetDto;

  @ApiProperty({ type: () => NotificationActivityDto })
  activity!: NotificationActivityDto;

  @ApiProperty()
  isRead = false;

  @ApiProperty()
  timestamp!: number;

  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty({ required: false })
  pk?: string;

  @ApiProperty({ required: false })
  _ts?: number;

  constructor(pros: Partial<NotificationDoc>) {
    Object.assign(this, pros);

    this.id = v4();
    this.pk = this.owner;
  }
}

export class NotificationResponse {
  @ApiProperty({ type: NotificationDoc, isArray: true })
  resources!: NotificationDoc[];

  @ApiProperty({ type: Boolean })
  hasMoreResults!: boolean;
}

export class NotificationCountResponse {
  @ApiProperty({ type: Number, description: 'Total count of notifications' })
  count!: number;
}
