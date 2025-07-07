/**
 * Available Fiat buy types.
 *
 * @enum {string} MarketPlaceBuy - secondary marketplace trade.
 * @enum {string} Giveaway - minting only Fiat priced nfts.
 * @enum {string} Mint - minting EGLD priced NFT with Fiat.
 * @enum {string} EventTicket - buying event tickets with Fiat
 */
export enum PurchaseType {
  MarketPlaceBuy = 'marketPlaceBuy',
  Giveaway = 'giveaway',
  Mint = 'mint',
  EventTicket = 'eventTicket',
}
