export enum ActivityChain {
  MULTIVERSX = 'MVX',
  SUI = 'SUI',
}

export enum EsdtTokenSubType {
  NonFungibleESDTv2 = 'NonFungibleESDTv2',
  DynamicNonFungibleESDT = 'DynamicNonFungibleESDT',
  DynamicSemiFungibleESDT = 'DynamicSemiFungibleESDT',
  DynamicMetaESDT = 'DynamicMetaESDT',
}

export enum EsdtTokenType {
  FungibleESDT = 'FungibleESDT',
  NonFungibleESDT = 'NonFungibleESDT',
  SemiFungibleESDT = 'SemiFungibleESDT',
  MetaESDT = 'MetaESDT',
}

export enum StorageContainerName {
  TOKENS = 'tokens',
  NFT_MEDIA = 'nftmedia',
  COLLECTION_PROFILE = 'collectionprofile',
  USER_PROFILE = 'userprofile',
  STAKING_POOLS = 'stakingpools',
  SMART_CONTRACT_ABI = 'smartcontractabi',
  UTILS = 'utils',
}

export enum MarketplaceActivity {
  LISTING_CREATE = 'listingCreate',
  LISTING_WITHDRAW = 'listingWithdraw',
  LISTING_UPDATE = 'listingUpdate',
  AUCTION_BID = 'auctionBid',
  AUCTION_OUT_BID = 'auctionOutBid',
  OFFER_CREATE = 'offerCreate',
  OFFER_WITHDRAW = 'offerWithdraw',
  OFFER_REJECT = 'offerReject',
  GLOBAL_OFFER_CREATE = 'globalOfferCreate',
  GLOBAL_OFFER_WITHDRAW = 'globalOfferWithdraw',
  TRADE = 'trade',
  BULK_TRADE = 'bulkTrade',
  AUCTION_TRADE = 'auctionTrade',
  OTHER_TRADE = 'otherTrade', // fiat or binance buy
  OFFER_TRADE = 'offerTrade',
  GLOBAL_OFFER_TRADE = 'globalOfferTrade',
  DEPOSIT = 'deposit',
  WITHDRAW_DEPOSIT = 'withdrawDeposit',
  SET_COLLECTION_CONFIG = 'setCollectionConfig',
}

export enum MarketplacesOnSaleNames {
  XOXNO_MARKETPLACE = 'xoxno',
  FRAMEIT_MARKETPLACE = 'frameit',
  DEADRARE_MARKETPLACE = 'deadrare',
  KROGAN_MARKETPLACE = 'krogan',
}

export enum AuctionTypes {
  FixedPrice = 'FixedPrice',
  Auctions = 'Auctions',
  All = 'All',
  AllListed = 'AllListed',
}
