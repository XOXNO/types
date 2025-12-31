import { TTLS } from './ttl';

/**
 * Shared cache key definitions for use across xoxno-api-v2 and xoxno-az-functions.
 * This ensures consistent cache keys and TTLs across all repositories.
 *
 * IMPORTANT: When adding/modifying cache keys:
 * 1. Define the key pattern here
 * 2. Update both API and az-functions to use these shared definitions
 * 3. Ensure TTLs are appropriate for the data's update frequency
 */

export interface CacheKeyConfig {
  key: string;
  ttl: number;
}

/**
 * Helper function for serializing ActivityChain arrays in cache keys.
 */
function serializeChain(chain?: string[]): string {
  return (chain ?? []).sort().join(',');
}

/**
 * Cache key generators for commonly used patterns.
 * These ensure consistent key formats across repositories.
 */
export const CacheKeys = {
  // ==========================================
  // User-related cache keys
  // ==========================================
  UserProfile: (address: string): CacheKeyConfig => ({
    key: `user:${address}:profile`,
    ttl: TTLS.ONE_DAY * 3,
  }),

  UserSettings: (address: string): CacheKeyConfig => ({
    key: `user:${address}:settings`,
    ttl: TTLS.ONE_YEAR,
  }),

  UserInventorySummary: (
    address: string,
    activeAuction: boolean,
  ): CacheKeyConfig => ({
    key: `user:${address}:inventory:summary:${activeAuction}`,
    ttl: TTLS.ONE_MINUTE * 10,
  }),

  UserHerotag: (address: string): CacheKeyConfig => ({
    key: `user:${address}:herotag`,
    ttl: TTLS.ONE_MONTH * 3,
  }),

  UserFavorite: (address: string, favoriteId: string): CacheKeyConfig => ({
    key: `user:${address}:favorite:${favoriteId}`,
    ttl: TTLS.ONE_YEAR,
  }),

  UserOffers: (address: string, offerType: string): CacheKeyConfig => ({
    key: `user:${address}:offers:${offerType}`,
    ttl: TTLS.ONE_HOUR * 2,
  }),

  UserPlacedOffersCount: (
    address: string,
    offerType: string,
  ): CacheKeyConfig => ({
    key: `user:${address}:offers:${offerType}:count`,
    ttl: TTLS.ONE_HOUR * 2,
  }),

  UserFavoriteUserAddresses: (address: string): CacheKeyConfig => ({
    key: `user:${address}:favorites:users`,
    ttl: TTLS.ONE_MONTH * 3,
  }),

  UserFavoriteCollectionTickers: (address: string): CacheKeyConfig => ({
    key: `user:${address}:favorites:collections`,
    ttl: TTLS.ONE_MONTH * 3,
  }),

  UserFavoriteNftIdentifiers: (address: string): CacheKeyConfig => ({
    key: `user:${address}:favorites:nfts`,
    ttl: TTLS.ONE_MONTH * 3,
  }),

  UserTradingSummary: (address: string): CacheKeyConfig => ({
    key: `user:${address}:trading:summary`,
    ttl: TTLS.ONE_MINUTE * 15,
  }),

  UserOwnedAndListedSummary: (address: string): CacheKeyConfig => ({
    key: `user:${address}:owned:listed:summary`,
    ttl: TTLS.ONE_HOUR * 3,
  }),

  UserStatistics: (hash: string): CacheKeyConfig => ({
    key: `query:user:statistics:${hash}`,
    ttl: TTLS.ONE_HOUR * 3,
  }),

  UserSearch: (filter: string): CacheKeyConfig => ({
    key: `search:user:${filter}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  UserCount: (chain?: string[]): CacheKeyConfig => ({
    key: `user:count${serializeChain(chain)}`,
    ttl: TTLS.ONE_DAY,
  }),

  AddressEsdt: (address: string): CacheKeyConfig => ({
    key: `user:${address}:esdt`,
    ttl: TTLS.ONE_SECOND * 6,
  }),

  UserXoxnoDropScore: (
    skip: number,
    top: number,
    address?: string,
  ): CacheKeyConfig => ({
    key: `user:${address}:xoxno:drop:score:${skip}:${top}`,
    ttl: TTLS.ONE_HOUR,
  }),

  EmailVerificationCode: (address: string): CacheKeyConfig => ({
    key: `user:${address}:email:verification:code`,
    ttl: TTLS.ONE_MINUTE * 10,
  }),

  // ==========================================
  // Collection-related cache keys
  // ==========================================
  CollectionProfile: (collection: string): CacheKeyConfig => ({
    key: `collection:${collection}:profile`,
    ttl: TTLS.ONE_MONTH * 3,
  }),

  CollectionStats: (collection: string): CacheKeyConfig => ({
    key: `collection:${collection}:stats`,
    ttl: TTLS.ONE_MINUTE * 30,
  }),

  CollectionFloorPrice: (
    collection: string,
    token: string,
  ): CacheKeyConfig => ({
    key: `collection:${collection}:floor:${token}`,
    ttl: TTLS.ONE_MONTH,
  }),

  CollectionTraitMap: (collection: string): CacheKeyConfig => ({
    key: `collection:${collection}:traits:map`,
    ttl: TTLS.ONE_HOUR * 3,
  }),

  CollectionRanks: (collection: string): CacheKeyConfig => ({
    key: `collection:${collection}:ranks`,
    ttl: TTLS.ONE_DAY * 2,
  }),

  CollectionMintProfile: (collection: string): CacheKeyConfig => ({
    key: `collection:${collection}:mint:profile`,
    ttl: TTLS.ONE_MONTH * 3,
  }),

  CollectionMintStages: (
    collection: string,
    enabledOnly: boolean,
  ): CacheKeyConfig => ({
    key: `collection:${collection}:mint:stages:${enabledOnly}`,
    ttl: TTLS.ONE_MONTH * 3,
  }),

  CollectionListedCount: (collection: string): CacheKeyConfig => ({
    key: `collection:${collection}:listed:count`,
    ttl: TTLS.ONE_DAY,
  }),

  CollectionListingDistribution: (collection: string): CacheKeyConfig => ({
    key: `collection:${collection}:listing:distribution`,
    ttl: TTLS.ONE_HOUR * 6,
  }),

  CollectionFloorPriceByAttribute: (collection: string): CacheKeyConfig => ({
    key: `collection:${collection}:floor:attributes`,
    ttl: TTLS.ONE_HOUR * 3,
  }),

  CollectionHoldersDetailed: (
    key: string,
    realOwners: boolean,
  ): CacheKeyConfig => ({
    key: `collection:${key}:holders:detailed:${realOwners}`,
    ttl: TTLS.ONE_HOUR * 6,
  }),

  CollectionHoldersCount: (key: string): CacheKeyConfig => ({
    key: `collection:${key}:holders:count`,
    ttl: TTLS.ONE_HOUR * 6,
  }),

  CollectionHoldersDocCount: (collection: string): CacheKeyConfig => ({
    key: `collection:${collection}:holders:doc:count`,
    ttl: TTLS.ONE_MONTH * 6,
  }),

  SftTotalSupplyCount: (collection: string): CacheKeyConfig => ({
    key: `collection:${collection}:supply:count`,
    ttl: TTLS.ONE_DAY,
  }),

  CollectionProfileDocs: (hash: string): CacheKeyConfig => ({
    key: `query:collection:profile:docs:${hash}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  CollectionStatsDocs: (query: string): CacheKeyConfig => ({
    key: `query:collection:stats:${query}`,
    ttl: TTLS.ONE_MINUTE * 10,
  }),

  CollectionOfferDocs: (hash: string): CacheKeyConfig => ({
    key: `query:collection:offers:${hash}`,
    ttl: TTLS.ONE_SECOND * 30,
  }),

  CollectionSearch: (filter: string): CacheKeyConfig => ({
    key: `search:collection:${filter}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  CollectionTickerByTags: (
    creatorTag: string,
    collectionTag: string,
  ): CacheKeyConfig => ({
    key: `collection:ticker:${creatorTag}:${collectionTag}`,
    ttl: TTLS.ONE_YEAR,
  }),

  CollectionListings: (collection: string): CacheKeyConfig => ({
    key: `collection:${collection}:listings`,
    ttl: TTLS.ONE_HOUR,
  }),

  AllBannedCollections: (): CacheKeyConfig => ({
    key: 'collection:banned:all',
    ttl: TTLS.ONE_DAY * 90,
  }),

  AllVerifiedCollections: (): CacheKeyConfig => ({
    key: 'collection:verified:all',
    ttl: TTLS.ONE_DAY * 90,
  }),

  // ==========================================
  // NFT-related cache keys
  // ==========================================
  NftDoc: (identifier: string): CacheKeyConfig => ({
    key: `nft:${identifier}:doc`,
    ttl: TTLS.ONE_DAY * 30,
  }),

  NftHasOffer: (identifier: string): CacheKeyConfig => ({
    key: `nft:${identifier}:offer:exists`,
    ttl: TTLS.ONE_YEAR,
  }),

  NftOffers: (identifier: string): CacheKeyConfig => {
    const collection = identifier.split('-').slice(0, 2).join('-');
    return {
      key: `collection:${collection}:offers:${identifier}`,
      ttl: TTLS.ONE_HOUR,
    };
  },

  NftDataDocs: (query: string): CacheKeyConfig => ({
    key: `query:nft:data:${query}`,
    ttl: TTLS.ONE_DAY * 7,
  }),

  NftSearch: (filter: string): CacheKeyConfig => ({
    key: `search:nft:${filter}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  NftMetadataUrl: (url: string): CacheKeyConfig => ({
    key: `nft:metadata:url:${url}`,
    ttl: TTLS.ONE_DAY * 30,
  }),

  NftMetadata: (identifier: string): CacheKeyConfig => ({
    key: `nft:metadata:${identifier}`,
    ttl: TTLS.ONE_DAY * 30,
  }),

  // ==========================================
  // Staking-related cache keys
  // ==========================================
  StakingPoolDoc: (poolId: number): CacheKeyConfig => ({
    key: `staking:${poolId}:profile`,
    ttl: TTLS.ONE_MONTH,
  }),

  StakingWlNonces: (poolId: number): CacheKeyConfig => ({
    key: `staking:${poolId}:whitelist:nonces`,
    ttl: TTLS.ONE_MONTH,
  }),

  StakingUserReward: (address: string, poolId: number): CacheKeyConfig => ({
    key: `staking:${poolId}:user:${address}:reward`,
    ttl: TTLS.ONE_SECOND * 6,
  }),

  StakingDataDocs: (query: string): CacheKeyConfig => ({
    key: `query:staking:data:${query}`,
    ttl: TTLS.ONE_SECOND * 30,
  }),

  StakingPoolsByCollection: (
    collections: string[],
    activePoolsOnly: boolean,
  ): CacheKeyConfig => {
    const collectionsKey = collections.sort().join(',');
    return {
      key: `staking:pools:collection:${collectionsKey}:active:${activePoolsOnly}`,
      ttl: TTLS.ONE_HOUR * 2,
    };
  },

  StakingPoolsSummaryByCollection: (): CacheKeyConfig => ({
    key: 'staking:pools:collection:summary',
    ttl: TTLS.ONE_HOUR * 3,
  }),

  StakingProviderOwner: (provider: string): CacheKeyConfig => ({
    key: `staking:${provider}:owner`,
    ttl: TTLS.ONE_DAY,
  }),

  StakingCreatedDelegationContract: (address: string): CacheKeyConfig => ({
    key: `staking:contract:${address}:delegation:created`,
    ttl: TTLS.ONE_DAY * 300,
  }),

  StakingProviderUserRewards: (
    address: string,
    currentEpoch: number,
  ): CacheKeyConfig => ({
    key: `staking:${address}:rewards:${currentEpoch}`,
    ttl: TTLS.ONE_DAY,
  }),

  StakingProviderEpochRewards: (
    provider: string,
    epoch: number,
  ): CacheKeyConfig => ({
    key: `staking:${provider}:epoch:${epoch}:rewards`,
    ttl: TTLS.ONE_WEEK * 54,
  }),

  ClaimableRewards: (
    address: string,
    delegationContract: string,
  ): CacheKeyConfig => ({
    key: `staking:rewards:${address}:${delegationContract}:claimable`,
    ttl: TTLS.ONE_HOUR * 3,
  }),

  AllUserDelegations: (address: string): CacheKeyConfig => ({
    key: `staking:user:${address}:delegations:all`,
    ttl: TTLS.ONE_HOUR * 3,
  }),

  EgldStakingProviders: (
    providers: string[],
    withIdentityInfo = true,
  ): CacheKeyConfig => ({
    key: `staking:${providers.join(',')}:egld:identity:${withIdentityInfo}`,
    ttl: TTLS.ONE_HOUR * 3,
  }),

  EgldStakingProvider: (provider: string): CacheKeyConfig => ({
    key: `staking:${provider}:egld`,
    ttl: TTLS.ONE_HOUR * 3,
  }),

  GetLastUpdatedEpoch: (provider: string, epoch: number): CacheKeyConfig => ({
    key: `staking:${provider}:epoch:${epoch}:last:updated`,
    ttl: TTLS.ONE_DAY,
  }),

  // ==========================================
  // Lending-related cache keys
  // ==========================================
  LendingMarketProfileDoc: (token: string): CacheKeyConfig => ({
    key: `lending:${token}:profile`,
    ttl: TTLS.ONE_MONTH,
  }),

  LendingAccountProfileDoc: (
    identifier: string,
    token: string,
  ): CacheKeyConfig => ({
    key: `lending:${token}:${identifier}:profile`,
    ttl: TTLS.ONE_MONTH,
  }),

  LendingTokenEModeProfileDoc: (
    token: string,
    eModeCategory: string,
  ): CacheKeyConfig => ({
    key: `lending:${token}:emode:${eModeCategory}:profile`,
    ttl: TTLS.ONE_YEAR,
  }),

  LendingPoolContracts: (controllerAddress: string): CacheKeyConfig => ({
    key: `lending:global:pool:${controllerAddress}:contracts`,
    ttl: TTLS.ONE_YEAR,
  }),

  LendingAllActiveAccounts: (): CacheKeyConfig => ({
    key: 'lending:global:accounts:all',
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  LendingAccountAttributes: (nonce: number): CacheKeyConfig => ({
    key: `lending:account:${nonce}:attributes`,
    ttl: TTLS.ONE_YEAR,
  }),

  LendingLiquidateablePositions: (): CacheKeyConfig => ({
    key: 'lending:global:positions:liquidateable',
    ttl: TTLS.ONE_MINUTE,
  }),

  LendingMarketIndexes: (tokens: string[]): CacheKeyConfig => ({
    key: `lending:market:${tokens.join(',')}:indexes`,
    ttl: TTLS.ONE_SECOND * 5,
  }),

  LendingAllMarketsTokens: (): CacheKeyConfig => ({
    key: 'lending:global:market:tokens:all',
    ttl: TTLS.ONE_HOUR * 6,
  }),

  LendingAccountPosition: (identifier: string): CacheKeyConfig => ({
    key: `lending:position:${identifier}`,
    ttl: TTLS.ONE_DAY,
  }),

  LendingFaucetClaimed: (address: string): CacheKeyConfig => ({
    key: `lending:global:faucet:${address}:claimed`,
    ttl: TTLS.ONE_YEAR,
  }),

  LendingBulkOraclePrice: (
    tokens: string[],
    returnAsUsd: boolean,
  ): CacheKeyConfig => ({
    key: `lending:oracle:${tokens.join(',')}:bulk:${returnAsUsd}`,
    ttl: TTLS.ONE_SECOND * 30,
  }),

  LendingTokenPriceAsUsd: (token: string): CacheKeyConfig => ({
    key: `lending:${token}:price:usd`,
    ttl: TTLS.ONE_SECOND * 30,
  }),

  LendingTokenPriceAsEgld: (token: string): CacheKeyConfig => ({
    key: `lending:${token}:price:egld`,
    ttl: TTLS.ONE_SECOND * 30,
  }),

  LendingOverallStats: (): CacheKeyConfig => ({
    key: 'lending:global:stats:overall',
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  LendingTopMarketParticipants: (token: string): CacheKeyConfig => ({
    key: `lending:${token}:participants:top`,
    ttl: TTLS.ONE_HOUR * 6,
  }),

  LendingMarketParticipantsCount: (token: string): CacheKeyConfig => ({
    key: `lending:${token}:participants:count`,
    ttl: TTLS.ONE_HOUR,
  }),

  LendingPositionLeaderboard: (hash: string): CacheKeyConfig => ({
    key: `query:lending:position:${hash}:leaderboard`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  LendingEModeCategoryProfileDoc: (id: string): CacheKeyConfig => ({
    key: `lending:emode:${id}:category:profile`,
    ttl: TTLS.ONE_YEAR,
  }),

  LendingMarketStatsGraphData: (
    startTime: string,
    endTime: string,
    bin: string,
    token?: string,
  ): CacheKeyConfig => ({
    key: `lending:market:${token}:stats:graph:${startTime}:${endTime}:${bin}`,
    ttl: TTLS.ONE_MINUTE * 15,
  }),

  LendingMarketAverageGraphData: (token: string): CacheKeyConfig => ({
    key: `lending:market:${token}:stats`,
    ttl: TTLS.ONE_HOUR * 4,
  }),

  // ==========================================
  // Event/Ticketing-related cache keys
  // ==========================================
  EventProfileDoc: (eventId: string): CacheKeyConfig => ({
    key: `event:${eventId}:profile`,
    ttl: TTLS.ONE_MONTH,
  }),

  EventStageDoc: (eventId: string, stageId: string): CacheKeyConfig => ({
    key: `event:${eventId}:stage:${stageId}:profile`,
    ttl: TTLS.ONE_MONTH,
  }),

  EventTicketProfileDoc: (
    eventId: string,
    ticketId: string,
  ): CacheKeyConfig => ({
    key: `event:${eventId}:ticket:${ticketId}:profile`,
    ttl: TTLS.ONE_MONTH,
  }),

  EventGuestDoc: (eventId: string, address: string): CacheKeyConfig => ({
    key: `event:${eventId}:guest:${address}:profile`,
    ttl: TTLS.ONE_MONTH,
  }),

  EventStartsFromPrice: (eventId: string): CacheKeyConfig => ({
    key: `event:${eventId}:price:starts:from`,
    ttl: TTLS.ONE_MONTH,
  }),

  EventQuestions: (eventId: string): CacheKeyConfig => ({
    key: `event:${eventId}:questions`,
    ttl: TTLS.ONE_MONTH,
  }),

  EventVoucherDoc: (eventId: string, voucherId: string): CacheKeyConfig => ({
    key: `event:${eventId}:voucher:${voucherId}:profile`,
    ttl: TTLS.ONE_MONTH,
  }),

  EventUserRoleDoc: (eventId: string, address: string): CacheKeyConfig => ({
    key: `event:${eventId}:user:${address}:role`,
    ttl: TTLS.ONE_MONTH,
  }),

  EventGuestSummary: (eventId: string): CacheKeyConfig => ({
    key: `event:${eventId}:guests:summary`,
    ttl: TTLS.ONE_MINUTE * 30,
  }),

  EventVoucherDocByCode: (eventId: string, code: string): CacheKeyConfig => ({
    key: `event:${eventId}:voucher:code:${code}`,
    ttl: TTLS.ONE_HOUR,
  }),

  EventIdBySlug: (slug: string): CacheKeyConfig => ({
    key: `event:slug:${slug}:id`,
    ttl: TTLS.ONE_YEAR,
  }),

  EventReferralConfigDoc: (
    eventId: string,
    configId: string,
  ): CacheKeyConfig => ({
    key: `event:${eventId}:referralConfig:${configId}`,
    ttl: TTLS.ONE_MONTH,
  }),

  EventReferralDoc: (
    eventId: string,
    referralCode: string,
  ): CacheKeyConfig => ({
    key: `event:${eventId}:referral:${referralCode}:profile`,
    ttl: TTLS.ONE_MONTH,
  }),

  // ==========================================
  // Token-related cache keys
  // ==========================================
  TokenDecimals: (token: string): CacheKeyConfig => ({
    key: `token:${token}:decimals`,
    ttl: TTLS.ONE_YEAR,
  }),

  TokenProperties: (tokenIdentifier: string): CacheKeyConfig => ({
    key: `token:${tokenIdentifier}:properties`,
    ttl: TTLS.ONE_MONTH * 3,
  }),

  TokenData: (token: string): CacheKeyConfig => ({
    key: `token:${token}:data`,
    ttl: TTLS.ONE_MONTH,
  }),

  TokenSupply: (token: string): CacheKeyConfig => ({
    key: `token:${token}:supply`,
    ttl: TTLS.ONE_HOUR,
  }),

  TokenSummary: (token: string): CacheKeyConfig => ({
    key: `token:${token}:summary`,
    ttl: TTLS.ONE_HOUR,
  }),

  MvxTokenSummary: (token: string): CacheKeyConfig => ({
    key: `token:${token}:summary:mvx`,
    ttl: TTLS.ONE_MINUTE * 15,
  }),

  TokenFiatPrice: (
    fiatCurrencies: string[],
    token: string,
  ): CacheKeyConfig => ({
    key: `token:${token}:fiat:price:${fiatCurrencies.join(',')}`,
    ttl: TTLS.ONE_MINUTE * 10,
  }),

  TokenUsdcValue: (token: string, timestamp: number): CacheKeyConfig => ({
    key: `token:${token}:usdc:value:${timestamp}`,
    ttl: TTLS.ONE_DAY,
  }),

  LpTokenInfo: (token: string): CacheKeyConfig => ({
    key: `token:lp:${token}:info`,
    ttl: TTLS.ONE_HOUR * 3,
  }),

  AllSwapTokens: (): CacheKeyConfig => ({
    key: 'token:swap:all',
    ttl: TTLS.ONE_DAY,
  }),

  AllTokensMap: (): CacheKeyConfig => ({
    key: 'token:map:all',
    ttl: TTLS.ONE_HOUR * 2,
  }),

  AllTokensMapHydrated: (): CacheKeyConfig => ({
    key: 'token:map:all:hydrated',
    ttl: TTLS.ONE_MINUTE * 5, // Shorter TTL since it includes prices
  }),


  AshTokenUsdValue: (token: string): CacheKeyConfig => ({
    key: `ash:token:${token}:usd:value`,
    ttl: TTLS.ONE_MINUTE * 10,
  }),

  AshSupportedTokens: (): CacheKeyConfig => ({
    key: 'ash:supported:tokens',
    ttl: TTLS.ONE_DAY,
  }),

  TokenAccountsCount: (token: string): CacheKeyConfig => ({
    key: `token:${token}:accounts:count`,
    ttl: TTLS.ONE_HOUR * 6,
  }),

  TokensByIdentifier: (
    tokens: string[],
    returnMap: boolean,
  ): CacheKeyConfig => ({
    key: `tokens:by:identifier:${tokens.sort().join(',')}:map:${returnMap}`,
    ttl: TTLS.ONE_DAY,
  }),

  TokensByFilterString: (
    identifier: string[],
    category: string[],
    chain: string[],
  ): CacheKeyConfig => {
    const identifierKey = identifier?.length
      ? identifier.sort().join(',')
      : 'all';
    const categoryKey = category?.length ? category.sort().join(',') : 'all';
    const chainKey = serializeChain(chain);
    return {
      key: `tokens:by:filter:${identifierKey}:${categoryKey}:${chainKey}`,
      ttl: TTLS.ONE_DAY,
    };
  },

  FilteredTokenDocs: (
    identifier: string[],
    category: string[],
    chain: string[],
  ): CacheKeyConfig => {
    const identifierKey = identifier?.length
      ? identifier.sort().join(',')
      : 'all';
    const categoryKey = category?.length ? category.sort().join(',') : 'all';
    const chainKey = serializeChain(chain);
    return {
      key: `token:docs:filtered:${identifierKey}:${categoryKey}:${chainKey}`,
      ttl: TTLS.ONE_DAY,
    };
  },

  // ==========================================
  // Launchpad-related cache keys
  // ==========================================
  LaunchpadAllRegisteredContracts: (): CacheKeyConfig => ({
    key: 'launchpad:contracts:registered:all',
    ttl: TTLS.ONE_MONTH,
  }),

  UserCreatorProfile: (address: string): CacheKeyConfig => ({
    key: `launchpad:creator:${address}:profile`,
    ttl: TTLS.ONE_MONTH,
  }),

  UserCreatorProfileByTag: (creatorTag: string): CacheKeyConfig => ({
    key: `launchpad:creator:${creatorTag}:profile`,
    ttl: TTLS.ONE_MONTH,
  }),

  UserCreatorTagRegistered: (tag: string): CacheKeyConfig => ({
    key: `launchpad:creator:${tag}:registered`,
    ttl: TTLS.ONE_MONTH,
  }),

  GetCreatorProfileByContractAddress: (
    contractAddress: string,
  ): CacheKeyConfig => ({
    key: `launchpad:creator:${contractAddress}:profile`,
    ttl: TTLS.ONE_YEAR,
  }),

  // ==========================================
  // Minter-related cache keys
  // ==========================================
  MinterLocalOwner: (address: string): CacheKeyConfig => ({
    key: `mint:launchpad:${address}:local:owner`,
    ttl: TTLS.ONE_YEAR,
  }),

  MinterUserMintsGlobal: (
    collectionTag: string,
    contractAddress: string,
    userAddress: string,
  ): CacheKeyConfig => ({
    key: `mint:${contractAddress}:${collectionTag}:user:${userAddress}:mints:global`,
    ttl: TTLS.ONE_SECOND * 6,
  }),

  MinterUserMintsPerStage: (
    collectionTag: string,
    contractAddress: string,
    userAddress: string,
    stageName: string,
  ): CacheKeyConfig => ({
    key: `mint:${contractAddress}:${collectionTag}:user:${userAddress}:stage:${stageName}:mints`,
    ttl: TTLS.ONE_SECOND * 6,
  }),

  MinterMintShareholders: (
    collectionTag: string,
    contractAddress: string,
  ): CacheKeyConfig => ({
    key: `mint:${contractAddress}:${collectionTag}:shareholders:mint`,
    ttl: TTLS.ONE_MONTH * 3,
  }),

  MinterRoyaltiesShareholders: (contractAddress: string): CacheKeyConfig => ({
    key: `mint:${contractAddress}:shareholders:royalties`,
    ttl: TTLS.ONE_MONTH * 3,
  }),

  MinterIsUserWhitelisted: (
    collectionTag: string,
    contractAddress: string,
    userAddress: string,
    stageName: string,
  ): CacheKeyConfig => ({
    key: `mint:${contractAddress}:${collectionTag}:user:${userAddress}:stage:${stageName}:whitelisted`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  // ==========================================
  // System-related cache keys
  // ==========================================
  CurrentEpoch: (): CacheKeyConfig => ({
    key: 'system:epoch:current',
    ttl: TTLS.ONE_SECOND * 6,
  }),

  EpochEndTimestamp: (): CacheKeyConfig => ({
    key: 'system:epoch:end:timestamp',
    ttl: TTLS.ONE_SECOND * 6,
  }),

  ShardCount: (): CacheKeyConfig => ({
    key: 'system:shard:count',
    ttl: TTLS.ONE_WEEK,
  }),

  CurrentTokenValue: (): CacheKeyConfig => ({
    key: 'system:token:value:current',
    ttl: TTLS.ONE_HOUR,
  }),

  NextRelayWalletIndex: (shard: number): CacheKeyConfig => ({
    key: `system:relay:wallet:${shard}:index:next`,
    ttl: TTLS.ONE_YEAR,
  }),

  AccumulatorCreators: (): CacheKeyConfig => ({
    key: 'system:accumulator:creators',
    ttl: TTLS.ONE_HOUR,
  }),

  LowVolumeCollections: (): CacheKeyConfig => ({
    key: 'system:collections:low:volume',
    ttl: TTLS.ONE_HOUR,
  }),

  // ==========================================
  // Liquid staking cache keys
  // ==========================================
  EGLDLiquidStats: (): CacheKeyConfig => ({
    key: 'liquid:egld:stats:overall',
    ttl: TTLS.ONE_HOUR,
  }),

  XoxnoLiquidStats: (): CacheKeyConfig => ({
    key: 'liquid:xoxno:stats:overall',
    ttl: TTLS.ONE_MINUTE * 15,
  }),

  XoxnoLiquidApy: (): CacheKeyConfig => ({
    key: 'liquid:xoxno:stats:apy',
    ttl: TTLS.ONE_HOUR,
  }),

  ExchangeRateLiquidXOXNO: (): CacheKeyConfig => ({
    key: 'liquid:xoxno:stats:exchange:rate',
    ttl: TTLS.ONE_HOUR,
  }),

  ExchangeRateLiquidXOXNOEGLD: (): CacheKeyConfig => ({
    key: 'liquid:egld:stats:exchange:rate',
    ttl: TTLS.ONE_HOUR,
  }),

  SEgldExchangeRate: (): CacheKeyConfig => ({
    key: 'system:segld:exchange:rate',
    ttl: TTLS.ONE_HOUR * 12,
  }),

  FeesXOXNOEGLD: (): CacheKeyConfig => ({
    key: 'liquid:egld:stats:fees',
    ttl: TTLS.ONE_DAY,
  }),

  PendingDelegateXOXNOEGLD: (): CacheKeyConfig => ({
    key: 'liquid:egld:pending:delegate',
    ttl: TTLS.ONE_HOUR,
  }),

  VirtualEGLDReserveXOXNOEGLD: (): CacheKeyConfig => ({
    key: 'liquid:egld:reserve:virtual',
    ttl: TTLS.ONE_HOUR,
  }),

  TotalWithdrawnXOXNOEGLD: (): CacheKeyConfig => ({
    key: 'liquid:egld:total:withdrawn',
    ttl: TTLS.ONE_HOUR,
  }),

  ValidatorsLiquidXOXNOEGLD: (): CacheKeyConfig => ({
    key: 'liquid:egld:providers',
    ttl: TTLS.ONE_HOUR * 5,
  }),

  AprLiquidXOXNOEGLD: (): CacheKeyConfig => ({
    key: 'liquid:egld:stats:apr',
    ttl: TTLS.ONE_HOUR,
  }),

  PendingUnstakeXOXNOEGLD: (): CacheKeyConfig => ({
    key: 'liquid:egld:pending:unstake',
    ttl: TTLS.ONE_HOUR,
  }),

  // ==========================================
  // Governance cache keys
  // ==========================================
  GovernanceVotesProviders: (): CacheKeyConfig => ({
    key: 'governance:providers',
    ttl: TTLS.ONE_MINUTE,
  }),

  GovernanceVotes: (): CacheKeyConfig => ({
    key: 'governance',
    ttl: TTLS.ONE_MINUTE,
  }),

  // ==========================================
  // Perp/Trading cache keys
  // ==========================================
  PerpSpotBalance: (user: string, coin: string): CacheKeyConfig => ({
    key: `perp:spot:${user}:${coin}`,
    ttl: TTLS.ONE_YEAR,
  }),

  PerpPerpBalance: (user: string, coin: string): CacheKeyConfig => ({
    key: `perp:perp:${user}:${coin}`,
    ttl: TTLS.ONE_YEAR,
  }),

  PerpOpenOrders: (user: string): CacheKeyConfig => ({
    key: `perp:openOrders:${user}`,
    ttl: TTLS.ONE_YEAR,
  }),

  PerpFilledOrders: (user: string): CacheKeyConfig => ({
    key: `perp:filledOrders:${user}`,
    ttl: TTLS.ONE_YEAR,
  }),

  PerpSpotUsers: (): CacheKeyConfig => ({
    key: 'perp:spot:users',
    ttl: TTLS.ONE_YEAR,
  }),

  PerpTermsAccepted: (user: string): CacheKeyConfig => ({
    key: `perp:legal-check:${user}:terms`,
    ttl: TTLS.ONE_YEAR,
  }),

  // ==========================================
  // Bober-related cache keys
  // ==========================================
  GetBoberBattleBiggestWinners: (): CacheKeyConfig => ({
    key: 'bober:battle:biggest:winners',
    ttl: TTLS.ONE_MINUTE * 10,
  }),

  GetAllBoberBattleTokens: (): CacheKeyConfig => ({
    key: 'bober:battle:tokens',
    ttl: TTLS.ONE_MINUTE * 10,
  }),

  BoberWheelWinners: (): CacheKeyConfig => ({
    key: 'bober:wheel:winners',
    ttl: TTLS.ONE_MINUTE * 10,
  }),

  BoberWheelConfig: (): CacheKeyConfig => ({
    key: 'bober:wheel:config',
    ttl: TTLS.ONE_MINUTE,
  }),

  BoberWheelScheduledSpin: (): CacheKeyConfig => ({
    key: 'bober:wheel:scheduled:spin',
    ttl: TTLS.ONE_DAY,
  }),

  BoberBattleLeaderboard: (hash: string): CacheKeyConfig => ({
    key: `bober:battle:leaderboard:${hash}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  BoberBattleSingleLeaderboard: (hash: string): CacheKeyConfig => ({
    key: `bober:battle:single:leaderboard:${hash}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  // ==========================================
  // Chat-related cache keys
  // ==========================================
  AllGroupChatIds: (): CacheKeyConfig => ({
    key: 'chat:groups:all:ids',
    ttl: TTLS.ONE_MONTH * 6,
  }),

  GroupChatProfile: (chatId: string): CacheKeyConfig => ({
    key: `chat:${chatId}:profile`,
    ttl: TTLS.ONE_MONTH * 6,
  }),

  ConversationDeleteTimestamp: (
    chatId: string,
    address: string,
  ): CacheKeyConfig => ({
    key: `chat:${chatId}:user:${address}:delete:timestamp`,
    ttl: TTLS.ONE_YEAR,
  }),

  IsSenderBlockedByReceiver: (
    sender: string,
    receiver: string,
  ): CacheKeyConfig => ({
    key: `chat:block:${sender}:by:${receiver}`,
    ttl: TTLS.ONE_YEAR,
  }),

  UserLastReadChatMessage: (
    chatId: string,
    address: string,
  ): CacheKeyConfig => ({
    key: `chat:${chatId}:user:${address}:last:read`,
    ttl: TTLS.ONE_YEAR,
  }),

  UserLastSentChatMessage: (
    chatId: string,
    address: string,
  ): CacheKeyConfig => ({
    key: `chat:${chatId}:user:${address}:last:sent`,
    ttl: TTLS.ONE_YEAR,
  }),

  // ==========================================
  // Web2-related cache keys
  // ==========================================
  Web2NativeWalletAddress: (userId: string): CacheKeyConfig => ({
    key: `web2:${userId}:native:wallet:address`,
    ttl: TTLS.ONE_YEAR,
  }),

  Web2UserDoc: (userId: string): CacheKeyConfig => ({
    key: `web2:${userId}:doc`,
    ttl: TTLS.ONE_MONTH * 3,
  }),

  // ==========================================
  // Location-related cache keys
  // ==========================================
  LocationPolygon: (query: string): CacheKeyConfig => ({
    key: `location:polygon:${query.toLowerCase().trim()}`,
    ttl: TTLS.ONE_MONTH * 6,
  }),

  GetCountries: (): CacheKeyConfig => ({
    key: 'location:countries:zontix',
    ttl: TTLS.ONE_DAY * 30,
  }),

  // ==========================================
  // Platform-related cache keys
  // ==========================================
  PinnedNftsApiResponse: (): CacheKeyConfig => ({
    key: 'platform:nfts:pinned:response',
    ttl: TTLS.ONE_HOUR,
  }),

  DropsPinnedCollectionsApiResponse: (): CacheKeyConfig => ({
    key: 'drops:pinned:collections:api:response',
    ttl: TTLS.ONE_HOUR * 6,
  }),

  HomePinnedCollectionsApiResponse: (): CacheKeyConfig => ({
    key: 'home:pinned:collections:api:response',
    ttl: TTLS.ONE_HOUR * 6,
  }),

  ListingCount: (chain?: string[]): CacheKeyConfig => ({
    key: `platform:stats:listing:count${serializeChain(chain)}`,
    ttl: TTLS.ONE_HOUR * 6,
  }),

  TradingStatistics: (chain?: string[]): CacheKeyConfig => ({
    key: `platform:stats:trading${serializeChain(chain)}`,
    ttl: TTLS.ONE_DAY,
  }),

  HatomTokenValues: (): CacheKeyConfig => ({
    key: 'platform:hatom:token:values',
    ttl: TTLS.ONE_HOUR,
  }),

  PendingExternalPayments: (): CacheKeyConfig => ({
    key: 'pending:external:payments',
    ttl: TTLS.ONE_MINUTE * 10,
  }),

  TwispayCallbackProcessed: (transactionId: string): CacheKeyConfig => ({
    key: `twispay:callback:processed:${transactionId}`,
    ttl: TTLS.ONE_MONTH,
  }),

  // ==========================================
  // Activity-related cache keys
  // ==========================================
  ActivityQuery: (queryHash: string): CacheKeyConfig => ({
    key: `activity:query:${queryHash}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  VolumeGraphData: (
    startTime: string,
    endTime: string,
    bin: string,
    collection?: string,
    chain?: string[],
  ): CacheKeyConfig => ({
    key: `volume:graph:data:${startTime}:${endTime}:${bin}:${collection}:${serializeChain(chain)}`,
    ttl: TTLS.ONE_MINUTE * 15,
  }),

  // ==========================================
  // Search-related cache keys
  // ==========================================
  GlobalSearch: (filter: string): CacheKeyConfig => ({
    key: `search:global:${filter}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  DropsSearch: (filter: string): CacheKeyConfig => ({
    key: `search:drops:${filter}`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  // ==========================================
  // Data API cache keys
  // ==========================================
  DataApiTokens: (): CacheKeyConfig => ({
    key: 'data:api:tokens',
    ttl: TTLS.ONE_MINUTE * 10,
  }),

  DataApiTokenPrice: (
    identifier: string,
    dateString: string,
    isCurrentDate: boolean,
  ): CacheKeyConfig => ({
    key: `data:api:price:${identifier}:${dateString}`,
    ttl: isCurrentDate ? TTLS.ONE_MINUTE * 5 : TTLS.ONE_WEEK,
  }),

  // ==========================================
  // ABI cache keys
  // ==========================================
  GetAbi: (abiName: string): CacheKeyConfig => ({
    key: `abi:${abiName}`,
    ttl: TTLS.ONE_DAY,
  }),

  // ==========================================
  // Sui-related cache keys
  // ==========================================
  SuiTransactionSender: (txDigest: string): CacheKeyConfig => ({
    key: `platform:sui:transaction:${txDigest}:sender`,
    ttl: TTLS.ONE_YEAR,
  }),

  SuiObject: (objectId: string): CacheKeyConfig => ({
    key: `platform:sui:object:${objectId}`,
    ttl: TTLS.ONE_YEAR,
  }),

  SuiEvents: (
    packageId: string,
    startTime: number,
    endTime: number,
    eventTypes: string[],
  ): CacheKeyConfig => ({
    key: `platform:sui:events:${packageId}:${startTime}:${endTime}:${eventTypes.join(',')}`,
    ttl: TTLS.ONE_HOUR * 6,
  }),

  SuiUserCoins: (userAddress: string): CacheKeyConfig => ({
    key: `platform:sui:user:${userAddress}:coins`,
    ttl: TTLS.ONE_MINUTE,
  }),

  SuiCollectionInfo: (collectionType: string): CacheKeyConfig => ({
    key: `platform:sui:collection:${collectionType}:info`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  SuiAllCollectionTypes: (): CacheKeyConfig => ({
    key: 'platform:sui:collections:types:all',
    ttl: TTLS.ONE_HOUR,
  }),

  SuiTokenPrices: (coinTypes: string[]): CacheKeyConfig => ({
    key: `platform:sui:tokens:${coinTypes.join(',')}:prices`,
    ttl: TTLS.ONE_MINUTE * 5,
  }),

  SuiQueryEventsPage: (
    moveEventType: string,
    order: 'ascending' | 'descending' | null | undefined,
    limit: number | null | undefined,
    cursor: { txDigest: string; eventSeq: string } | null | undefined,
  ): CacheKeyConfig => {
    const cursorKey = cursor
      ? `${cursor.txDigest}:${cursor.eventSeq}`
      : 'start';
    const orderKey = order ?? 'ascending';
    const limitKey = limit ?? 'default';
    return {
      key: `platform:sui:queryEvents:${moveEventType}:${orderKey}:${limitKey}:${cursorKey}`,
      ttl: TTLS.ONE_MINUTE,
    };
  },

  // ==========================================
  // Kusto-related cache keys
  // ==========================================
  KustoXoxnoLiquidStats: (): CacheKeyConfig => ({
    key: 'kusto:xoxno:liquid:stats',
    ttl: TTLS.ONE_HOUR,
  }),

  KustoEgldLiquidStats: (): CacheKeyConfig => ({
    key: 'kusto:egld:liquid:stats',
    ttl: TTLS.ONE_HOUR,
  }),
};

/**
 * Cache key patterns for invalidation.
 * Used by az-functions to find and delete related cache entries.
 *
 * @deprecated Use CacheIndexKeys with index sets instead of SCAN patterns.
 * SCAN is expensive in serverless environments and causes connection saturation.
 */
export const CachePatterns = {
  UserAll: (address: string) => `user:${address}:*`,
  CollectionAll: (collection: string) => `collection:${collection}:*`,
  NftAll: (identifier: string) => `nft:${identifier}:*`,
  StakingPoolAll: (poolId: number) => `staking:${poolId}:*`,
  LendingTokenAll: (token: string) => `lending:${token}:*`,
  EventAll: (eventId: string) => `event:${eventId}:*`,
};

// ==========================================
// Index Set Keys (for O(1) cache invalidation)
// ==========================================
/**
 * Index set keys for efficient cache invalidation.
 *
 * Instead of using SCAN to find cache keys by pattern (expensive in serverless),
 * we maintain Redis SETs that track which cache keys belong to which collection/address.
 *
 * Usage:
 * - API: When setting a cache, also SADD the key to relevant index sets
 * - Azure Functions: When invalidating, use SMEMBERS to get keys from index sets
 *
 * This reduces O(n) SCAN operations to O(1) SMEMBERS lookups.
 */
export const CacheIndexKeys = {
  // ==========================================
  // NFT Query Index Sets
  // ==========================================
  /**
   * Index of all NFT query cache keys for a specific collection.
   * When API caches an NFT query result, it adds the cache key to this set.
   * When invalidating, az-functions reads this set instead of SCAN.
   */
  NftQueryByCollection: (collection: string) =>
    `idx:nft:query:collection:${collection.toLowerCase()}`,

  /**
   * Index of all NFT query cache keys for a specific address (owner, seller).
   */
  NftQueryByAddress: (address: string) =>
    `idx:nft:query:address:${address.toLowerCase()}`,

  /**
   * Index of all global/wildcard NFT query cache keys (explore pages).
   * These are queries with no specific collection or address filter.
   */
  NftQueryGlobal: 'idx:nft:query:global',

  // ==========================================
  // Offer Query Index Sets
  // ==========================================
  OfferQueryByCollection: (collection: string) =>
    `idx:offer:query:collection:${collection.toLowerCase()}`,

  OfferQueryByAddress: (address: string) =>
    `idx:offer:query:address:${address.toLowerCase()}`,

  OfferQueryByIdentifier: (identifier: string) =>
    `idx:offer:query:identifier:${identifier.toLowerCase()}`,

  OfferQueryGlobal: 'idx:offer:query:global',

  // ==========================================
  // Collection Query Index Sets
  // ==========================================
  CollectionQueryByTicker: (ticker: string) =>
    `idx:collection:query:ticker:${ticker.toLowerCase()}`,

  CollectionStatsQueryByTicker: (ticker: string) =>
    `idx:collection:stats:ticker:${ticker.toLowerCase()}`,

  CollectionOffersQueryByTicker: (ticker: string) =>
    `idx:collection:offers:ticker:${ticker.toLowerCase()}`,

  CollectionQueryGlobal: 'idx:collection:query:global',

  // ==========================================
  // Activity Query Index Sets
  // ==========================================
  ActivityQueryByCollection: (collection: string) =>
    `idx:activity:query:collection:${collection.toLowerCase()}`,

  ActivityQueryByAddress: (address: string) =>
    `idx:activity:query:address:${address.toLowerCase()}`,

  ActivityQueryGlobal: 'idx:activity:query:global',
};

/**
 * Metadata for cache index registration.
 * When setting a cache key, this metadata determines which index sets to add it to.
 */
export interface CacheIndexMetadata {
  /** Collections that this cache key relates to */
  collections?: string[];
  /** Addresses (owners, sellers, buyers) that this cache key relates to */
  addresses?: string[];
  /** NFT identifiers that this cache key relates to */
  identifiers?: string[];
  /** True if this is a global/wildcard query (no specific filters) */
  isGlobal?: boolean;
}

/**
 * Type of query cache for determining which index keys to use.
 */
export type CacheIndexType = 'nft' | 'offer' | 'collection' | 'activity';
