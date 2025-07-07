import { EgldOrEsdtTokenPayment } from '../../../common/tokenPayent';
import { CollectionDataType } from './dataTypes';

export class CollectionMintProfileDoc {
  dataType: CollectionDataType = CollectionDataType.MintProfile;
  collection!: string;
  creatorTag!: string;
  creatorName!: string;
  contractAddress!: string;
  collectionTag!: string;
  cid!: string;
  mediaType!: string;
  baseNftName!: string;
  hasAttributes!: boolean;
  ownerTransferred!: boolean;
  collectionSize!: number;
  totalNftMinted!: number;
  globalWalletLimit!: number;
  royalties!: number;
  oldVersion!: boolean;
  nameShuffle!: boolean;
  nftTransferLimited!: boolean;
  allowsPublicBurn?: boolean;
  kycRequired!: boolean;
  allowsRefund!: boolean;
  hasBotProtection!: boolean;
  hasReveal!: boolean;
  tags!: string | string[];
  prices: EgldOrEsdtTokenPayment[] = []; // represents min starting price out of each public stage
  startTime!: number; // represents the earliest start time of each public stage
  endTime!: number; // represents the latest end time out of each public stage
  isSoldOut: boolean = false; // represents if the collection is sold out
  id!: string;
  _ts?: number;

  constructor(props?: Partial<CollectionMintProfileDoc>) {
    Object.assign(this, props);
    this.id = `${this.collection}-${this.dataType}`;
    if (typeof this.tags === 'string') {
      this.tags = this.tags.split(',');
    }
  }
}

export type CollectionMintProfileDocType = CollectionMintProfileDoc;
