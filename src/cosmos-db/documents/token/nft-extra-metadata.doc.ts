import { NftExtraAttributesType } from '../../../requests/nft-data/nft-extra-attributes.type';
import { TokenDataType } from './token-data.enum';

export class NftExtraMetadata {
  dataType: TokenDataType = TokenDataType.NftExtraMetadata;
  identifier!: string;
  collection!: string;
  type!: NftExtraAttributesType;
  attributes!: Record<string, string>[];
  id!: string;

  constructor(props?: Partial<NftExtraMetadata>) {
    Object.assign(this, props);
    this.id = `${this.identifier}-${TokenDataType.NftExtraMetadata}`;
  }
}
