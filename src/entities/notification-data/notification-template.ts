import { ApiProperty } from '@nestjs/swagger';
import { NotificationAction } from '../../enums/notification-template.enum';

export class NotificationMetadata {
  @ApiProperty({
    enum: NotificationAction,
    enumName: 'NotificationAction',
    description: 'Action to perform when notification is tapped',
  })
  action!: NotificationAction;

  @ApiProperty({
    required: false,
    description: 'Event ID for event-related notifications',
  })
  eventId?: string;

  @ApiProperty({
    required: false,
    description: 'User address for profile-related notifications',
  })
  userAddress?: string;

  @ApiProperty({
    required: false,
    description: 'Collection ID for NFT-related notifications',
  })
  collectionId?: string;

  @ApiProperty({
    required: false,
    description: 'NFT ID for NFT-related notifications',
  })
  nftId?: string;

  @ApiProperty({
    required: false,
    description: 'Transaction hash for transaction-related notifications',
  })
  transactionHash?: string;

  @ApiProperty({ required: false, description: 'Deep link URL for navigation' })
  deepLink?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export class NotificationTemplate {
  @ApiProperty({ description: 'Notification title' })
  title!: string;

  @ApiProperty({ description: 'Notification body text' })
  body!: string;

  @ApiProperty({ required: false, description: 'URL to notification image' })
  imageUrl?: string;

  @ApiProperty({
    required: false,
    description: 'Sound to play with notification',
  })
  sound?: string;

  @ApiProperty({ required: false, description: 'Badge count to display' })
  badge?: number;

  @ApiProperty({
    type: NotificationMetadata,
    description: 'Metadata for deep linking and actions',
  })
  metadata!: NotificationMetadata;
}

export class NotificationTemplateBuilder {
  static eventApproved(
    eventTitle: string,
    eventProfile: string,
    eventId: string,
  ): NotificationTemplate {
    return {
      title: '🎉 Event Registration Approved!',
      body: `You've been approved for "${eventTitle}". Get ready for an amazing experience!`,
      imageUrl: eventProfile,
      sound: 'default',
      badge: 1,
      metadata: {
        action: NotificationAction.OPEN_EVENT,
        eventId,
        deepLink: `xoxno://event/${eventId}`,
      },
    };
  }

  static eventUpdate(
    eventTitle: string,
    message: string,
    eventProfile: string,
    eventId: string,
  ): NotificationTemplate {
    return {
      title: `📢 ${eventTitle} - Update`,
      body: message,
      imageUrl: eventProfile,
      sound: 'default',
      metadata: {
        action: NotificationAction.OPEN_EVENT,
        eventId,
        deepLink: `xoxno://events/${eventId}`,
      },
    };
  }

  static eventReminder(
    eventTitle: string,
    startTime: number,
    eventProfile: string,
    eventId: string,
  ): NotificationTemplate {
    const hoursUntil = Math.ceil((startTime - Date.now() / 1000) / 3600);
    return {
      title: `⏰ Event Reminder`,
      body: `"${eventTitle}" starts in ${hoursUntil} hours! Don't miss out.`,
      imageUrl: eventProfile,
      sound: 'default',
      badge: 1,
      metadata: {
        action: NotificationAction.OPEN_EVENT,
        eventId,
        deepLink: `xoxno://events/${eventId}`,
      },
    };
  }

  static creatorMarketing(
    creatorName: string,
    message: string,
    creatorProfile: string,
    creatorAddress: string,
  ): NotificationTemplate {
    return {
      title: `✨ ${creatorName} has news for you!`,
      body: message,
      imageUrl: creatorProfile,
      sound: 'default',
      metadata: {
        action: NotificationAction.OPEN_PROFILE,
        userAddress: creatorAddress,
        deepLink: `xoxno://profile/${creatorAddress}`,
      },
    };
  }

  static nftSold(
    nftName: string,
    price: number,
    paymentToken: string,
    nftUrl: string,
    collectionId: string,
    nftId: string,
  ): NotificationTemplate {
    return {
      title: '💰 NFT Sold!',
      body: `Your "${nftName}" sold for ${price} ${paymentToken}!`,
      imageUrl: nftUrl,
      sound: 'default',
      badge: 1,
      metadata: {
        action: NotificationAction.OPEN_MARKETPLACE,
        collectionId,
        nftId,
        deepLink: `xoxno://nft/${collectionId}/${nftId}`,
      },
    };
  }

  static offerReceived(
    nftName: string,
    price: number,
    paymentToken: string,
    nftUrl: string,
    collectionId: string,
    nftId: string,
  ): NotificationTemplate {
    return {
      title: '💎 New Offer Received!',
      body: `You received a ${price} ${paymentToken} offer for "${nftName}"`,
      imageUrl: nftUrl,
      sound: 'default',
      badge: 1,
      metadata: {
        action: NotificationAction.OPEN_MARKETPLACE,
        collectionId,
        nftId,
        deepLink: `xoxno://nft/${collectionId}/${nftId}`,
      },
    };
  }

  static custom(
    title: string,
    body: string,
    imageUrl?: string,
    metadata?: Partial<NotificationMetadata>,
  ): NotificationTemplate {
    return {
      title,
      body,
      imageUrl,
      sound: 'default',
      metadata: {
        action: NotificationAction.NO_ACTION,
        ...metadata,
      },
    };
  }
}
