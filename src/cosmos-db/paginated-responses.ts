import { OwnerDto } from '../common/owner.dto';
import { GlobalSearchResourcesDto } from '../entities/search-data/search.dto';
import {
  CosmosPaginatedResponse,
  CosmosPaginatedSingleResponse,
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
import { NftHydrated } from './documents/token/nft-details.doc';
import { NftOfferDocHydrated } from './documents/token/nft-offer.doc';

export class EventReferralConfigPaginated extends CosmosPaginatedResponse<EventReferralConfigDoc> {}
export class EventReferralPaginated extends CosmosPaginatedResponse<EventReferralDoc> {}
export class GlobalSearchResourcesPaginated extends CosmosPaginatedSingleResponse<GlobalSearchResourcesDto> {}
export class NotificationPaginated extends CosmosPaginatedResponse<NotificationDoc> {}

export class UserBlockPaginated extends CosmosPaginatedResponse<UserBlockDocHydrated> {}
export class UserConversationPaginated extends CosmosPaginatedResponse<UserConversationDocHydrated> {}
export class ChatMessagePaginated extends CosmosPaginatedResponse<ChatMessageDocHydrated> {
  receiver!: OwnerDto;
}
export class NftActivityPaginated extends CosmosPaginatedResponse<NftActivityDocHydrated> {}
export class NftPaginated extends CosmosPaginatedResponse<NftHydrated> {}
export class CollectionProfilePaginated extends CosmosPaginatedResponse<CollectionProfileDoc> {}
export class CollectionMintProfilePaginated extends CosmosPaginatedResponse<CollectionMintProfileDocHydrated> {}
export class GlobalOfferPaginated extends CosmosPaginatedResponse<GlobalOfferDocHydrated> {}
export class CollectionStatsPaginated extends CosmosPaginatedResponse<CollectionStatsDocHydrated> {}
export class NftOfferPaginated extends CosmosPaginatedResponse<NftOfferDocHydrated> {}
