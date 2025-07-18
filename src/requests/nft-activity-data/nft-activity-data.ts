import { ShortCollectionDoc } from '../../cosmos-db/documents/short/short-collection.doc';
import { ShortNftDoc } from '../../cosmos-db/documents/short/short-nft.doc';
import { XoxnoAuctionTypeString } from '../../enums/xoxno-auction-type.enum';

export class NftActivityData {
  collection!: string;
  identifier?: string; // missing in globalOfferCreate
  price!: number;
  paymentToken!: string;
  quantity!: number;
  scId!: number;
  usdValue!: number;
  egldValue!: number;
  auctionType?: XoxnoAuctionTypeString; // available for listingCreate
  deadline?: number; // available for offerCreate & auctions
  originalPayment?: {
    paymentToken: string;
    price: number;
  }; // for ash buy events
  originalTokenAmount?: string;
  originalTokenAmountShort?: number;
  originalTokenEgldValue?: number;
  originalTokenUsdValue?: number;
  originalTokenIdentifier?: string;

  constructor(props?: Partial<NftActivityData>) {
    Object.assign(this, props);
  }
}

export class NftActivityDataHydrated extends NftActivityData {
  nftInfo!: ShortNftDoc;
  collectionInfo!: ShortCollectionDoc;
}

export interface NftMvxBuiltIn {
  collection: string;
  identifier: string;
  // creator/burner will be the from field
}
