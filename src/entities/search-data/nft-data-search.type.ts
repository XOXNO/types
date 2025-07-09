import { NftMetadataAttributes } from '../../cosmos-db/documents/token/nft-metadata-attributes';

export interface NftDataSearchResult {
  identifier: string;
  collection: string;
  name: string;
  attributes: NftMetadataAttributes[];
  onSale: boolean;
  type: string;
}
