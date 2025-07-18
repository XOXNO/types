import { NotificationDataType } from '../../../enums/notification-data-type.enum';
import { NotificationAssetType } from '../../../enums/notification-asset-type.enum';
import { MarketplaceActivity } from '../../../enums/marketplace-activity.enum';

export class NotificationDoc {
  dataType = NotificationDataType.Notification;
  txHash!: string;
  source!: string;
  activityType!: MarketplaceActivity;
  owner!: string;
  message?: string;
  asset!: NotificationAsset;
  activity!: NotificationActivity;
  isRead: boolean = false;
  timestamp!: number;
  id?: string;
  pk?: string;
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
};
