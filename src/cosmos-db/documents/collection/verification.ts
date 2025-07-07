import { CollectionDataType } from './dataTypes';

export class CollectionVerificationDoc {
  dataType: CollectionDataType = CollectionDataType.CollectionVerification;
  collection!: string;
  isVerified!: boolean;
  isVisible!: boolean;
  lastActionAddress!: string;
  lastActionTimestamp!: number;
  id!: string;

  constructor(props?: Partial<CollectionVerificationDoc>) {
    Object.assign(this, props);
    this.id = `${this.collection}-${this.dataType}`;
  }
}
