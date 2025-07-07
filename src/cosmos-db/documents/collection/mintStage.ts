import { EgldOrEsdtTokenPayment } from '../../../common/tokenPayent';
import { CollectionDataType } from './dataTypes';

export class CollectionMintStageDoc {
  dataType: CollectionDataType = CollectionDataType.MintStage;
  collection!: string;
  contractAddress!: string;
  collectionTag!: string;
  name!: string;
  startTime!: number;
  endTime!: number;
  mintCount!: number;
  mintLimit!: number;
  mintEnabled!: boolean;
  isWhitelist!: boolean;
  walletLimit!: number;
  prices: EgldOrEsdtTokenPayment[] = [];
  id!: string;

  constructor(props?: Partial<CollectionMintStageDoc>) {
    Object.assign(this, props);
    this.id = `${this.collection}-${this.name}-${this.dataType}`;
  }
}

export type CollectionMintStageDocType = CollectionMintStageDoc;
