import { NftDoc } from '../../cosmos-db/documents/token/nft-details.doc';
import { XoxnoAuctionTypeString } from '../../entities/xoxno-marketplace-sc/xoxno-auction-type.enum';

export interface NftActivityData {
  collection: string;
  identifier?: string; // missing in globalOfferCreate
  price: number;
  paymentToken: string;
  quantity: number;
  scId: number;
  usdValue: number;
  egldValue: number;
  auctionType?: XoxnoAuctionTypeString; // available for listingCreate
  deadline?: number; // available for offerCreate & auctions
  originalPayment?: {
    paymentToken: string;
    price: number;
  }; // for ash buy events
  nftInfo?: Partial<NftDoc>; // set on query
  originalTokenAmount?: string;
  originalTokenAmountShort?: number;
  originalTokenEgldValue?: number;
  originalTokenUsdValue?: number;
}

export interface NftMvxBuiltIn {
  collection: string;
  identifier: string;
  // creator/burner will be the from field
}
