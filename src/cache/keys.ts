import { ActivityChain } from '../enums/common.enum';
import { TTLS } from './ttl';

function serializeChain(chain?: ActivityChain[]) {
  return (chain ?? []).sort().join(',');
}

/**
 * An object that defines all Redis keys and their TTLs.
 * This ensures consistency and a single source of truth.
 *
 * Each entry should return an object: { key: string, ttl: number }
 */
export const REDIS_KEYS = {
  LendingAllMarketsTokens: {
    key: 'lendingAllMarketsTokens',
    ttl: TTLS.ONE_HOUR * 6,
  },
  MinterLocalOwner: (address: string) => ({
    key: `launchpadLocalOwner:${address}`,
    ttl: TTLS.ONE_YEAR,
  }),
  GetCreatorProfileByContractAddress: (contractAddress: string) => ({
    key: `userCreatorProfileByContractAddress:${contractAddress}`,
    ttl: TTLS.ONE_YEAR,
  }),
  GetBoberBattleBiggestWinners: {
    key: 'boberBattleBiggestWinners',
    ttl: TTLS.ONE_MINUTE * 10,
  },
  GetAllBoberBattleTokens: {
    key: 'allBoberBattleTokens',
    ttl: TTLS.ONE_MINUTE * 10,
  },
  StakingProviderOwner: (provider: string) => ({
    key: `stakingProviderOwner:${provider}`,
    ttl: TTLS.ONE_DAY,
  }),
  StakingCreatedDelegationContract: (address: string) => ({
    key: `stakingCreatedDelegationContract:${address}`,
    ttl: TTLS.ONE_YEAR,
  }),
  StakingProviderUserRewards: (address: string, currentEpoch: number) => ({
    key: `stakingProviderUserRewardsV2:${address}:${currentEpoch}`,
    ttl: TTLS.ONE_DAY,
  }),
  StakingProviderEpochRewards: (provider: string, epoch: number) => ({
    key: `stakingProviderEpochRewardsData:${provider}:${epoch}`,
    ttl: TTLS.ONE_YEAR,
  }),
  LendingFaucetClaimed: (address: string) => ({
    key: `faucetv3-${address}`,
    ttl: TTLS.ONE_YEAR,
  }),
  BoberWheelWinners: {
    key: 'boberWheelWinners',
    ttl: TTLS.ONE_MINUTE * 10,
  },
  BoberWheelConfig: {
    key: 'boberWheelConfig',
    ttl: TTLS.ONE_MINUTE,
  },
  BoberWheelScheduledSpin: {
    key: 'boberWheelScheduledSpin',
    ttl: TTLS.ONE_DAY,
  },
  LendingBulkOraclePrice: (tokens: string[], returnAsUsd: boolean) => ({
    key: `lendingBulkOraclePrice:${tokens.join(',')}:${returnAsUsd}`,
    ttl: TTLS.ONE_SECOND * 30,
  }),
  LpTokenInfo: (token: string) => ({
    key: `lpTokenInfo:${token}`,
    ttl: TTLS.ONE_HOUR * 3,
  }),
  LendingTokenPriceAsUsd: (token: string) => ({
    key: `lendingTokenPriceUsd:${token}`,
    ttl: TTLS.ONE_SECOND * 30,
  }),
  LendingOverallStats: {
    key: 'LendingOverallStats',
    ttl: TTLS.ONE_HOUR,
  },
  LendingTopMarketParticipants: (token: string) => ({
    key: `lendingTopMarketParticipants:${token}`,
    ttl: TTLS.ONE_HOUR * 6,
  }),
  LendingMarketParticipantsCount: (token: string) => ({
    key: `lendingMarketParticipantsCount:${token}`,
    ttl: TTLS.ONE_HOUR,
  }),
  LendingPositionLeaderboard: (hash: string) => ({
    key: `lendingPositionLeaderboard:${hash}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),
  LendingTokenPriceAsEgld: (token: string) => ({
    key: `lendingTokenPriceEgld:${token}`,
    ttl: TTLS.ONE_SECOND * 30,
  }),
  LendingPoolContracts: (controllerAddress: string) => ({
    key: `lendingPoolContracts:${controllerAddress}`,
    ttl: TTLS.ONE_YEAR,
  }),
  LendingTokenEModeProfileDoc: (token: string, eModeCategory: string) => ({
    key: `lendingTokenEModeProfileDoc:${token}:${eModeCategory}`,
    ttl: TTLS.ONE_YEAR,
  }),
  LendingEModeCategoryProfileDoc: (id: string) => ({
    key: `lendingEModeCategoryProfileDoc:${id}`,
    ttl: TTLS.ONE_YEAR,
  }),
  LendingMarketProfileDoc: (token: string) => ({
    key: `lendingMarketProfileDoc:${token}`,
    ttl: TTLS.ONE_MONTH,
  }),
  LendingAccountProfileDoc: (identifier: string, token: string) => ({
    key: `lendingAccountProfileDoc:${identifier}:${token}`,
    ttl: TTLS.ONE_MONTH,
  }),
  LocationPolygon: (query: string) => ({
    key: `locationPolygon:${query.toLowerCase().trim()}`,
    ttl: TTLS.ONE_MONTH * 6,
  }),
  UserInventorySummary: (address: string, activeAuction: boolean) => ({
    key: `userInventorySummary:${address}:${activeAuction}`,
    ttl: TTLS.ONE_MINUTE * 10,
  }),
  EventStartsFromPrice: (eventId: string) => ({
    key: `eventStartsFromPrice:${eventId}`,
    ttl: TTLS.ONE_MONTH,
  }),
  EventQuestions: (eventId: string) => ({
    key: `eventQuestions:${eventId}`,
    ttl: TTLS.ONE_MONTH,
  }),
  EventVoucherDoc: (eventId: string, voucherId: string) => ({
    key: `event:${eventId}VoucherDoc:${voucherId}`,
    ttl: TTLS.ONE_MONTH,
  }),
  EventUserRoleDoc: (eventId: string, address: string) => ({
    key: `event:${eventId}UserRolDoc:${address}`,
    ttl: TTLS.ONE_MONTH,
  }),
  EventGuestSummary: (eventId: string) => ({
    key: `eventGuestSummary:${eventId}`,
    ttl: TTLS.ONE_MINUTE * 30,
  }),
  EventGuestDoc: (eventId: string, address: string) => ({
    key: `event:${eventId}GuestDoc:${address}`,
    ttl: TTLS.ONE_MONTH,
  }),
  EventVoucherDocByCode: (eventId: string, code: string) => ({
    key: `event:${eventId}:voucher:code:${code}`,
    ttl: TTLS.ONE_HOUR,
  }),
  EventStageDoc: (eventId: string, stageId: string) => ({
    key: `event:${eventId}StageDoc:${stageId}`,
    ttl: TTLS.ONE_MONTH,
  }),
  EventIdBySlug: (slug: string) => ({
    key: `eventIdBySlug:${slug}`,
    ttl: TTLS.ONE_YEAR,
  }),
  EventTicketProfileDoc: (eventId: string, ticketId: string) => ({
    key: `event:${eventId}TicketDoc:${ticketId}`,
    ttl: TTLS.ONE_MONTH,
  }),
  EventProfileDoc: (eventId: string) => ({
    key: `eventDoc:${eventId}`,
    ttl: TTLS.ONE_MONTH,
  }),
  NftSearch: (filter: string) => ({
    key: `nftSearch:${filter}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),
  GetCountries: {
    key: 'countries:zontix',
    ttl: TTLS.ONE_DAY * 30,
  },
  NftMetadataUrl: (url: string) => ({
    key: `nftMetadataUrl:${url}`,
    ttl: TTLS.ONE_DAY * 30,
  }),
  NftMetadata: (identifier: string) => ({
    key: `nftMetadata:${identifier}`,
    ttl: TTLS.ONE_DAY * 30,
  }),
  XoxnoLiquidStats: {
    key: 'xoxnoLiquidStats',
    ttl: TTLS.ONE_MINUTE * 15,
  },
  XoxnoLiquidApy: {
    key: 'xoxnoLiquidApy',
    ttl: TTLS.ONE_HOUR,
  },
  CollectionListedCount: (collection: string) => ({
    key: `collectionListedCount:${collection}`,
    ttl: TTLS.ONE_DAY,
  }),
  EmailVerificationCode: (address: string) => ({
    key: `emailVerificationCode:${address}`,
    ttl: TTLS.ONE_MINUTE * 10,
  }),
  UserSettings: (address: string) => ({
    key: `userSettings:${address}`,
    ttl: TTLS.ONE_YEAR,
  }),
  UserFavorite: (address: string, favoriteId: string) => ({
    key: `userFavorite:${address}:${favoriteId}`,
    ttl: TTLS.ONE_YEAR,
  }),
  ClaimableRewards: (address: string, delegationContract: string) => ({
    key: `claimableRewards:${address}:${delegationContract}`,
    ttl: TTLS.ONE_HOUR * 3,
  }),
  AllUserDelegations: (address: string) => ({
    key: `allUserDelegations:${address}`,
    ttl: TTLS.ONE_HOUR * 3,
  }),
  EgldStakingProviders: (providers: string[], withIdentityInfo = true) => ({
    key: `egld:providers:${providers.join(',')}:${withIdentityInfo}`,
    ttl: TTLS.ONE_HOUR * 3,
  }),
  EgldStakingProvider: (provider: string) => ({
    key: `egld:provider:${provider}`,
    ttl: TTLS.ONE_HOUR * 3,
  }),
  GetLastUpdatedEpoch: (provider: string, epoch: number) => ({
    key: `egld:provider:${provider}:lastUpdatedEpoch:${epoch}`,
    ttl: TTLS.ONE_DAY,
  }),
  CollectionStats: (collection: string) => ({
    key: `collectionStats:${collection}`,
    ttl: TTLS.ONE_MINUTE * 30,
  }),
  AllGroupChatIds: {
    key: `allGroupChatIds`,
    ttl: TTLS.ONE_MONTH * 6,
  },
  GroupChatProfile: (chatId: string) => ({
    key: `groupChatProfile:${chatId}`,
    ttl: TTLS.ONE_MONTH * 6,
  }),
  PinnedNftsApiResponse: {
    key: 'pinnedNftsApiResponse',
    ttl: TTLS.ONE_HOUR,
  },
  ConversationDeleteTimestamp: (chatId: string, address: string) => ({
    key: `conversationDeleteTimestamp:${chatId}:${address}`,
    ttl: TTLS.ONE_YEAR,
  }),
  IsSenderBlockedByReceiver: (sender: string, receiver: string) => ({
    key: `isSenderBlockedByReceiver:${sender}:${receiver}`,
    ttl: TTLS.ONE_YEAR,
  }),
  UserLastReadChatMessage: (chatId: string, address: string) => ({
    key: `userLastReadChatMessage:${chatId}:${address}`,
    ttl: TTLS.ONE_YEAR,
  }),
  UserLastSentChatMessage: (chatId: string, address: string) => ({
    key: `userLastSentChatMessage:${chatId}:${address}`,
    ttl: TTLS.ONE_YEAR,
  }),
  UserXoxnoDropScore: (skip: number, top: number, address?: string) => ({
    key: `userXoxnoDropScoreDefi:${skip}:${top}:${address}`,
    ttl: TTLS.ONE_HOUR,
  }),
  Web2NativeWalletAddress: (userId: string) => ({
    key: `web2NativeWalletAddress:${userId}`,
    ttl: TTLS.ONE_YEAR,
  }),
  Web2UserDoc: (userId: string) => ({
    key: `web2UserDoc:${userId}`,
    ttl: TTLS.ONE_MONTH * 3,
  }),
  StakingPoolsSummaryByCollection: {
    key: 'stakingPoolsSummaryByCollection',
    ttl: TTLS.ONE_HOUR * 3,
  },
  TwispayCallbackProcessed: (transactionId: string) => ({
    key: `twispayCallbackProcessed:${transactionId}`,
    ttl: TTLS.ONE_MONTH,
  }),
  PendingExternalPayments: {
    key: 'pendingExternalPayments',
    ttl: TTLS.ONE_MINUTE * 10,
  },
  NextRelayWalletIndex: (shard: number) => ({
    key: `nextRelayWalletIndex:${shard}`,
    ttl: TTLS.ONE_YEAR,
  }),
  DropsPinnedCollectionsApiResponse: {
    key: 'dropsPinnedCollectionsApiResponse',
    ttl: TTLS.ONE_HOUR,
  },
  HomePinnedCollectionsApiResponse: {
    key: 'homePinnedCollectionsApiResponse',
    ttl: TTLS.ONE_HOUR,
  },
  NftHasOffer: (identifier: string) => ({
    key: `nftHasOffer:${identifier}`,
    ttl: TTLS.ONE_YEAR,
  }),
  LaunchpadAllRegisteredContracts: {
    key: 'launchpadAllRegisteredContracts',
    ttl: TTLS.ONE_MONTH,
  },
  UserStatistics: (hash: string) => ({
    key: `userStatistics:${hash}`,
    ttl: TTLS.ONE_HOUR * 3,
  }),
  UserOwnedAndListedSummary: (address: string) => ({
    key: `userOwnedAndListedSummary:${address}`,
    ttl: TTLS.ONE_HOUR * 3,
  }),
  UserSearch: (filter: string) => ({
    key: `userSearch:${filter}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),
  DropsSearch: (filter: string) => ({
    key: `drops:${filter}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),
  CollectionSearch: (filter: string) => ({
    key: `collectionSearch:${filter}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),
  GlobalSearch: (filter: string) => ({
    key: `globalSearch:${filter}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),
  ListingCount: (chain?: ActivityChain[]) => ({
    key: `listingCount${serializeChain(chain)}`,
    ttl: TTLS.ONE_HOUR * 6,
  }),
  UserCount: (chain?: ActivityChain[]) => ({
    key: `userCount${serializeChain(chain)}`,
    ttl: TTLS.ONE_DAY,
  }),
  TradingStatistics: (chain?: ActivityChain[]) => ({
    key: `tradingStatistics${serializeChain(chain)}`,
    ttl: TTLS.ONE_DAY,
  }),
  ShardCount: {
    key: 'shardCount',
    ttl: TTLS.ONE_WEEK,
  },
  AddressEsdt: (address: string) => ({
    key: `addressEsdt:${address}`,
    ttl: TTLS.ONE_SECOND * 6,
  }),
  UserFavoriteUserAddresses: (address: string) => ({
    key: `userFavoriteUserAddresses:${address}`,
    ttl: TTLS.ONE_MONTH * 3,
  }),
  UserFavoriteCollectionTickers: (address: string) => ({
    key: `userFavoriteCollectionTickers:${address}`,
    ttl: TTLS.ONE_MONTH * 3,
  }),
  UserFavoriteNftIdentifiers: (address: string) => ({
    key: `userFavoriteNftIdentifiers:${address}`,
    ttl: TTLS.ONE_MONTH * 3,
  }),
  UserTradingSummary: (address: string) => ({
    key: `userTradingSummary:${address}`,
    ttl: TTLS.ONE_MINUTE * 15,
  }),
  LendingMarketStatsGraphData: (
    startTime: string,
    endTime: string,
    bin: string,
    token?: string,
  ) => ({
    key: `lendingMarketStatsGraphData:${startTime}:${endTime}:${bin}:${token}`,
    ttl: TTLS.ONE_MINUTE * 15,
  }),
  VolumeGraphData: (
    startTime: string,
    endTime: string,
    bin: string,
    collection?: string,
    chain?: ActivityChain[],
  ) => ({
    key: `volumeGraphData:${startTime}:${endTime}:${bin}:${collection}:${serializeChain(
      chain,
    )}`,
    ttl: TTLS.ONE_MINUTE * 15,
  }),
  DataApiTokens: {
    key: 'dataApiTokens',
    ttl: TTLS.ONE_MINUTE * 10,
  },
  DataApiTokenPrice: (identifier: string, timestamp?: number) => {
    const priceDate = timestamp ? new Date(timestamp * 1000) : new Date();
    // A simple implementation of toISODateString for portability
    const toISODateString = (date: Date) => date.toISOString().split('T')[0];
    const isCurrentDate =
      toISODateString(priceDate) === toISODateString(new Date());
    const ttl = isCurrentDate ? TTLS.ONE_MINUTE * 5 : TTLS.ONE_WEEK;

    return {
      key: `dataApiPrice:${identifier}:${toISODateString(priceDate)}`,
      ttl,
    };
  },
  CollectionTickerByTags: (creatorTag: string, collectionTag: string) => ({
    key: `collectionTickerByTags:${creatorTag}:${collectionTag}`,
    ttl: TTLS.ONE_YEAR,
  }),
  TokenFiatPrice: (fiatCurrencies: string[], token: string) => ({
    key: `tokenFiatPrice:${fiatCurrencies.join(',')}:${token}`,
    ttl: TTLS.ONE_MINUTE * 10,
  }),
  AshTokenUsdValue: (token: string) => ({
    key: `ashTokenUsdValue:${token}`,
    ttl: TTLS.ONE_MINUTE * 10,
  }),
  AshSupportedTokens: {
    key: 'ashSupportedTokens',
    ttl: TTLS.ONE_DAY,
  },
  StakingUserRewardByPoolId: (address: string, poolId: number) => ({
    key: `stakingUserRewardByPoolId:${poolId}:${address}`,
    ttl: TTLS.ONE_SECOND * 6,
  }),
  StakingWlNonces: (poolId: number) => ({
    key: `stakingWlNonces:${poolId}`,
    ttl: TTLS.ONE_MONTH,
  }),
  StakingDataDocs: (query: string) => ({
    key: `stakingDataItems:${query}`,
    ttl: TTLS.ONE_SECOND * 30,
  }),
  StakingPoolDoc: (poolId: number) => ({
    key: `stakingPoolDoc:${poolId}`,
    ttl: TTLS.ONE_MONTH,
  }),
  CollectionListingDistribution: (collection: string) => ({
    key: `collectionListingDistribution:${collection}`,
    ttl: TTLS.ONE_HOUR * 6,
  }),
  CollectionTraitMap: (collection: string) => ({
    key: `collectionTraitMap:${collection}`,
    ttl: TTLS.ONE_HOUR * 3,
  }),
  CollectionFloorPriceByAttribute: (collection: string) => ({
    key: `collectionFloorPriceByAttribute:${collection}`,
    ttl: TTLS.ONE_HOUR * 3,
  }),
  UserCreatorProfileByTag: (creatorTag: string) => ({
    key: `userCreatorProfileByTag:${creatorTag}`,
    ttl: TTLS.ONE_MONTH,
  }),
  UserCreatorProfile: (address: string) => ({
    key: `userCreatorProfile:${address}`,
    ttl: TTLS.ONE_MONTH,
  }),
  UserCreatorTagRegistered: (tag: string) => ({
    key: `userCreatorTagRegistered:${tag}`,
    ttl: TTLS.ONE_MONTH,
  }),
  CollectionFloorPrice: (collection: string, token: string) => ({
    key: `floorPrice:${collection}:${token}`,
    ttl: TTLS.ONE_MONTH,
  }),
  NftDataDocs: (query: string) => ({
    key: `nftDataItems:${query}`,
    ttl: TTLS.ONE_SECOND * 30,
  }),
  TokenData: (token: string) => ({
    key: `tokenData:${token}`,
    ttl: TTLS.ONE_MONTH,
  }),
  AllBannedCollections: {
    key: 'bannedCollections',
    ttl: TTLS.ONE_DAY * 30,
  },
  AllVerifiedCollections: {
    key: 'verifiedCollections',
    ttl: TTLS.ONE_DAY * 30,
  },
  CollectionProfileDocs: (hash: string) => ({
    key: `collectionProfileDocs:${hash}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),
  CollectionOfferDocs: (hash: string) => ({
    key: `collectionOffers:${hash}`,
    ttl: TTLS.ONE_SECOND * 30,
  }),
  TokenUsdcValue: (token: string, timestamp: number) => ({
    key: `tokenUsdcValue:${token}:${timestamp}`,
    ttl: TTLS.ONE_DAY,
  }),
  UserProfile: (address: string) => ({
    key: `userProfile:${address}`,
    ttl: TTLS.ONE_DAY * 3,
  }),
  EpochEndTimestamp: {
    key: 'epochEndTimestamp',
    ttl: TTLS.ONE_SECOND * 6,
  },
  CurrentEpoch: {
    key: `currentEpoch`,
    ttl: TTLS.ONE_SECOND * 6,
  },
  CurrentTokenValue: {
    key: `currentTokenValue`,
    ttl: TTLS.ONE_HOUR * 1,
  },
  SEgldExchangeRate: {
    key: `sEgldExchangeRate`,
    ttl: TTLS.ONE_HOUR * 12,
  },
  CollectionHoldersDetailed: (key: string, realOwners: boolean) => ({
    key: `collectionHoldersDetailed:${key}:${realOwners}`,
    ttl: TTLS.ONE_HOUR * 6,
  }),
  SftTotalSupplyCount: (key: string) => ({
    key: `sftTotalSupplyCount:${key}`,
    ttl: TTLS.ONE_DAY,
  }),
  CollectionHoldersCount: (key: string) => ({
    key: `collectionHoldersCount:${key}`,
    ttl: TTLS.ONE_HOUR * 6,
  }),
  CollectionStatsDocs: (query: string) => ({
    key: `collectionStats:${query}`,
    ttl: TTLS.ONE_MINUTE * 10,
  }),
  CollectionMintStages: (collection: string, enabledOnly: boolean) => ({
    key: `collectionMintStages:${collection}:${enabledOnly}`,
    ttl: TTLS.ONE_MONTH * 3,
  }),
  CollectionMintProfile: (collection: string) => ({
    key: `collectionMintProfile:${collection}`,
    ttl: TTLS.ONE_MONTH * 3,
  }),
  TokenDecimals: (token: string) => ({
    key: `tokenDecimals:${token}`,
    ttl: TTLS.ONE_YEAR,
  }),
  AllSwapTokens: {
    key: `allSwapTokens`,
    ttl: TTLS.ONE_DAY,
  },
  AllTokensMap: {
    key: 'fetchAllTokensMap',
    ttl: TTLS.ONE_HOUR * 2,
  },
  TokenSupply: (token: string) => ({
    key: `tokenSupply:${token}`,
    ttl: TTLS.ONE_HOUR,
  }),
  MvxTokenSummary: (token: string) => ({
    key: `mvxTokenSummary:${token}`,
    ttl: TTLS.ONE_MINUTE * 15,
  }),
  TokenSummary: (token: string) => ({
    key: `tokenSummary:${token}`,
    ttl: TTLS.ONE_HOUR,
  }),
  MinterUserMintsGlobal: (
    collectionTag: string,
    contractAddress: string,
    userAddress: string,
  ) => ({
    key: `minterUserMintsGlobal:${collectionTag}:${contractAddress}:${userAddress}`,
    ttl: TTLS.ONE_SECOND * 6,
  }),
  MinterUserMintsPerStage: (
    collectionTag: string,
    contractAddress: string,
    userAddress: string,
    stageName: string,
  ) => ({
    key: `minterUserMintsPerStage:${collectionTag}:${contractAddress}:${userAddress}:${stageName}`,
    ttl: TTLS.ONE_SECOND * 6,
  }),
  MinterMintShareholders: (collectionTag: string, contractAddress: string) => ({
    key: `minterMintShareholders:${collectionTag}:${contractAddress}`,
    ttl: TTLS.ONE_MONTH * 3,
  }),
  MinterRoyaltiesShareholders: (contractAddress: string) => ({
    key: `minterRoyaltiesShareholders:${contractAddress}`,
    ttl: TTLS.ONE_MONTH * 3,
  }),
  MinterIsUserWhitelisted: (
    collectionTag: string,
    contractAddress: string,
    userAddress: string,
    stageName: string,
  ) => ({
    key: `minterIsUserWhitelisted:${collectionTag}:${contractAddress}:${userAddress}:${stageName}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),
  CollectionProfile: (collection: string) => ({
    key: `collectionProfile:${collection}`,
    ttl: TTLS.ONE_MONTH,
  }),
  GetAbi: (abiName: string) => ({
    key: `abi:${abiName}`,
    ttl: TTLS.ONE_DAY,
  }),
  EsdtTokenProperties: (tokenIdentifier: string) => ({
    key: `esdtTokenProperties:${tokenIdentifier}`,
    ttl: TTLS.ONE_MONTH * 3,
  }),
  AccountHerotag: (address: string) => ({
    key: `accountHerotag:${address}`,
    ttl: TTLS.ONE_MONTH * 3,
  }),
  CollectionHoldersDocCount: (collection: string) => ({
    key: `collectionHoldersDocCount:${collection}`,
    ttl: TTLS.ONE_MONTH * 6,
  }),
  AccumulatorCreators: {
    key: `accumulator:creators`,
    ttl: TTLS.ONE_HOUR,
  },
  ExchangeRateLiquidXOXNO: {
    key: `liquid:xoxno:exchangeRate`,
    ttl: TTLS.ONE_HOUR,
  },
  ExchangeRateLiquidXOXNOEGLD: {
    key: `liquid:xoxno:egld:exchangeRate`,
    ttl: TTLS.ONE_HOUR,
  },
  FeesXOXNOEGLD: {
    key: `liquid:xoxno:egld:fees`,
    ttl: TTLS.ONE_DAY,
  },
  PendingDelegateXOXNOEGLD: {
    key: `liquid:xoxno:egld:pendingDelegate`,
    ttl: TTLS.ONE_HOUR,
  },
  VirtualEGLDReserveXOXNOEGLD: {
    key: `liquid:xoxno:egld:virtualReserve`,
    ttl: TTLS.ONE_HOUR,
  },
  EGLDLiquidStats: {
    key: `liquid:egld:stats`,
    ttl: TTLS.ONE_HOUR,
  },
  TotalWithdrawnXOXNOEGLD: {
    key: `liquid:xoxno:egld:totalWithdrawn`,
    ttl: TTLS.ONE_HOUR,
  },
  ValidatorsLiquidXOXNOEGLD: {
    key: `liquid:xoxno:egld:stakingProviders`,
    ttl: TTLS.ONE_HOUR * 5,
  },
  AprLiquidXOXNOEGLD: {
    key: `liquid:xoxno:egld:apr`,
    ttl: TTLS.ONE_HOUR,
  },
  PendingUnstakeXOXNOEGLD: {
    key: `liquid:xoxno:egld:pendingUnstake`,
    ttl: TTLS.ONE_HOUR,
  },
  HatomTokenValues: {
    key: 'hatomTokenValues',
    ttl: TTLS.ONE_HOUR,
  },
  LowVolumeCollections: {
    key: 'lowVolumeCollections',
    ttl: TTLS.ONE_HOUR,
  },
  EventReferralConfigDoc: (eventId: string, configId: string) => ({
    key: `event:${eventId}:referralConfig:${configId}`,
    ttl: TTLS.ONE_MONTH,
  }),
  EventReferralDoc: (eventId: string, referralCode: string) => ({
    key: `event:${eventId}:referral:${referralCode}`,
    ttl: TTLS.ONE_MONTH,
  }),
  SuiTransactionSender: (txDigest: string) => ({
    key: `suiTransactionSender:${txDigest}`,
    ttl: TTLS.ONE_YEAR,
  }),
  SuiObject: (objectId: string) => ({
    key: `suiObject:${objectId}`,
    ttl: TTLS.ONE_YEAR,
  }),
};

export type RedisKeys = typeof REDIS_KEYS;
