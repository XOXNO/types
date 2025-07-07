import { ActivityChain } from '../../../common/enums';
import { NftProps } from './nft-details.doc';
import { TokenDataType } from './token-data.enum';

export class NftOfferDoc {
  dataType: TokenDataType = TokenDataType.Offer;
  identifier!: string;
  collection!: string;
  offerId!: number;
  paymentToken!: string;
  paymentTokenNonce!: number;
  price!: string;
  priceShort!: number;
  priceUsd?: number;
  floorPriceMargin?: number;
  deadline!: number;
  timestamp!: number;
  owner!: string;
  nftOwner?: string;
  quantity!: number;
  marketplace!: string;
  auctionId?: number;
  isActive: boolean = true;
  chain: ActivityChain = ActivityChain.MULTIVERSX;
  id!: string;
  _ts!: number;

  constructor(props?: Partial<NftOfferDoc>) {
    Object.assign(this, props);
    this.id = `${this.identifier}-${this.offerId}-${this.marketplace}-${this.dataType}`;
    if (!this.timestamp) {
      this.timestamp = Math.floor(Date.now() / 1000);
    }
  }
}

export class NftOfferProps extends NftOfferDoc {
  constructor(props?: Partial<NftOfferDoc>) {
    super(props);
  }

  usdValue?: number;
  floorPriceMargin?: number;
  floorPrice?: number;
  nftInfo?: Partial<NftProps>;
}
