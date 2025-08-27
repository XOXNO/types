export enum NftActivityType {
  // MVX Built-in
  NFT_CREATE = 'nftCreate',
  NFT_BURN = 'nftBurn',
  NFT_UPDATE = 'nftUpdate',
  NFT_TRANSFER = 'nftTransfer',
  // Marketplace
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
  // Staking
  STAKE = 'stake',
  UN_STAKE = 'unStake',
  // Coin Flip Games
  CREATE_GAME = 'createGame',
  JOIN_GAME = 'joinGame',
  CANCEL_GAME = 'cancelGame',
  END_GAME = 'endGame',
  // Wheel Games
  SPIN = 'spin',
  JOIN_WHEEL = 'joinWheel',
}
