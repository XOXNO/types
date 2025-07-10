import { IOrderBy } from '../cosmos-db/cosmos-db-generic-filter';
import { NftActivityDoc } from '../cosmos-db/documents/activity/nft-activity.doc';
import { CollectionProfileDoc } from '../cosmos-db/documents/collection/profile';
import { CollectionStatsDoc } from '../cosmos-db/documents/collection/stats';
import { NftDoc } from '../cosmos-db/documents/token/nft-details.doc';
import { FilterQueryDto } from '../entities/search-data/filter-query.dto';
import { GlobalSearchResponseDto } from '../entities/search-data/search.dto';
import { CollectionProfileDto } from '../requests/collection/collections';
import { DropResourceDto } from '../requests/collection/drops-query';
import {
  GlobalOfferDto,
  GlobalOffersDto,
} from '../requests/collection/query-global-offers';

export type OrderByTradingActivity = IOrderBy<
  NftActivityDoc,
  'activityData.egldValue' | 'timestamp'
>;

type IFrames = 'day' | 'week' | 'month' | 'year';

export type CollectionStatsOrderBy = IOrderBy<
  CollectionStatsDoc,
  | 'tradingStats.listedCount'
  | 'tradingStats.floorPrice'
  | 'tradingStats.totalVolume'
  | 'tradingStats.totalTrades'
  | 'tradingStats.allTimeHigh.price'
  | `tradingStats.${IFrames}.volume`
  | `tradingStats.${IFrames}.volumeMargin`
  | `tradingStats.${IFrames}.trades`
  | `tradingStats.${IFrames}.tradesMargin`
>;

export type SearchOrderBy = IOrderBy<
  NftDoc,
  | 'saleInfo.minBidShort'
  | 'saleInfo.maxBidShort'
  | 'saleInfo.currentBidShort'
  | 'saleInfo.timestamp'
  | 'saleInfo.deadline'
  | 'metadata.rarity.rank'
  | 'nonce'
>;

export type DropsOrderBy = IOrderBy<DropResourceDto, 'startTime'>;

export type CollectionsOrderBy = IOrderBy<
  CollectionProfileDto,
  | 'statistics.tradeData.weekEgldVolume'
  | 'statistics.tradeData.dayEgldVolume'
  | 'statistics.tradeData.totalEgldVolume'
  | 'statistics.tradeData.averageEgldPrice'
  | 'statistics.tradeData.athEgldPrice'
  | 'statistics.tradeData.totalTrades'
  | 'statistics.other.nftCount'
  | 'statistics.other.followCount'
>;

export type GlobalOfferOrderBy = IOrderBy<
  GlobalOfferDto,
  'priceShort' | 'offerId' | 'timestamp'
>;
