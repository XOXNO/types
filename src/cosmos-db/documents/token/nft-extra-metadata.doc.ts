import { NftExtraAttributesType } from '../../../enums/nft-extra-attributes.enum';
import { TokenDataType } from '../../../enums/token-data.enum';

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
