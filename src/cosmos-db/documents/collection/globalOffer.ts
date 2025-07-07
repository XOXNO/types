import { ActivityChain } from '../../../common/enums';
import { NftMetadataAttributes } from '../token/nft-metadata-attributes';
import { CollectionDataType } from './dataTypes';
import { CollectionProfileDoc } from './profile';

export class GlobalOfferDoc {
  dataType: CollectionDataType = CollectionDataType.GlobalOffer;
  offerId!: number;
  collection!: string;
  owner!: string;
  price!: string;
  paymentToken!: string;
  paymentTokenNonce!: number;
  quantity!: number;
  marketplace!: string;
  timestamp!: number;
  attributes: NftMetadataAttributes[] = [];
  priceShort!: number;
  floorPriceMargin?: number; // used on user profile offers
  floorPrice?: number; // used on user profile offers
  isActive: boolean = true;
  collectionInfo?: Partial<CollectionProfileDoc>; // used on user profile offers
  chain: ActivityChain = ActivityChain.MULTIVERSX;
  usdValue?: number;
  id!: string;
  _ts!: number;

  constructor(props?: Partial<GlobalOfferDoc>) {
    Object.assign(this, props);
    this.id = `${this.collection}-${this.offerId}-${this.marketplace}-${this.dataType}`;
  }
}
