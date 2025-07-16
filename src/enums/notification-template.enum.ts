import { ApiProperty } from '@nestjs/swagger';

export enum NotificationAction {
  OPEN_EVENT = 'open_event',
  OPEN_PROFILE = 'open_profile',
  OPEN_NOTIFICATIONS = 'open_notifications',
  OPEN_TICKETS = 'open_tickets',
  OPEN_WALLET = 'open_wallet',
  OPEN_MARKETPLACE = 'open_marketplace',
  NO_ACTION = 'no_action',
}
