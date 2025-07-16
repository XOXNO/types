export enum PushNotificationType {
  EVENT_APPROVED = 'eventApproved',
  EVENT_UPDATE = 'eventUpdate',
  EVENT_REMINDER = 'eventReminder',
  EVENT_CHECK_IN = 'eventCheckIn',
  EVENT_MARKETING = 'eventMarketing',
  NFT_SOLD = 'nftSold',
  OFFER_RECEIVED = 'offerReceived',
  USER_SPECIFIC = 'userSpecific',
  BROADCAST = 'broadcast',
}

export enum PushNotificationStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  PENDING = 'pending',
}
