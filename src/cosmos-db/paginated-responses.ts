import { ApiProperty } from '@nestjs/swagger';
import { OwnerDto } from '../common/owner.dto';
import { GlobalSearchResourcesDto } from '../entities/search-data/search.dto';
import {
  createCosmosPaginatedResponse,
  createCosmosPaginatedSingleResponse,
} from './cosmos-db-paginated-response.dto';
import { NftActivityDocHydrated } from './documents/activity/nft-activity.doc';
import { ChatMessageDocHydrated } from './documents/chat/chat-message.doc';
import { UserBlockDocHydrated } from './documents/chat/user-block.doc';
import { UserConversationDocHydrated } from './documents/chat/user-conversation.doc';
import { GlobalOfferDocHydrated } from './documents/collection/globalOffer';
import { CollectionMintProfileDocHydrated } from './documents/collection/mintProfile';
import { CollectionProfileDoc } from './documents/collection/profile';
import { CollectionStatsDocHydrated } from './documents/collection/stats';
import { NotificationDoc } from './documents/notification/notification.doc';
import { EventReferralConfigDoc } from './documents/ticketing/event-referral-config.doc';
import { EventReferralDoc } from './documents/ticketing/event-referral.doc';
import { NftDocHydrated } from './documents/token/nft-details.doc';
import { NftOfferDocHydrated } from './documents/token/nft-offer.doc';

export class EventReferralConfigPaginated extends createCosmosPaginatedResponse(
  EventReferralConfigDoc,
) {}
export class EventReferralPaginated extends createCosmosPaginatedResponse(
  EventReferralDoc,
) {}
export class GlobalSearchResourcesPaginated extends createCosmosPaginatedSingleResponse(
  GlobalSearchResourcesDto,
) {}
export class NotificationPaginated extends createCosmosPaginatedResponse(
  NotificationDoc,
) {}

export class UserBlockPaginated extends createCosmosPaginatedResponse(
  UserBlockDocHydrated,
) {}
export class UserConversationPaginated extends createCosmosPaginatedResponse(
  UserConversationDocHydrated,
) {}
export class ChatMessagePaginated extends createCosmosPaginatedResponse(
  ChatMessageDocHydrated,
) {
  @ApiProperty()
  receiver!: OwnerDto;
}
export class NftActivityPaginated extends createCosmosPaginatedResponse(
  NftActivityDocHydrated,
) {}
export class NftPaginated extends createCosmosPaginatedResponse(
  NftDocHydrated,
) {}
export class CollectionProfilePaginated extends createCosmosPaginatedResponse(
  CollectionProfileDoc,
) {}
export class CollectionMintProfilePaginated extends createCosmosPaginatedResponse(
  CollectionMintProfileDocHydrated,
) {}
export class GlobalOfferPaginated extends createCosmosPaginatedResponse(
  GlobalOfferDocHydrated,
) {}
export class CollectionStatsPaginated extends createCosmosPaginatedResponse(
  CollectionStatsDocHydrated,
) {}
export class NftOfferPaginated extends createCosmosPaginatedResponse(
  NftOfferDocHydrated,
) {}
