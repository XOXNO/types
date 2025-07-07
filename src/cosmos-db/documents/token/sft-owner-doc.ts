import { EsdtTokenType } from '../../../common/enums';
import { TokenDataType } from './token-data.enum';

export class SftOwnerDoc {
  dataType: string = TokenDataType.SftOwner;
  identifier!: string;
  collection!: string;
  type!: string;
  owner!: string;
  balance!: number;
  balanceLong?: string;
  onSale: boolean = false;
  id?: string;
  _ts?: number;

  constructor(props?: Partial<SftOwnerDoc>) {
    if (
      props?.type != EsdtTokenType.SemiFungibleESDT &&
      props?.type != EsdtTokenType.MetaESDT
    ) {
      throw new Error(`invalid type [${props?.type}] for sft owner doc`);
    }
    Object.assign(this, props);
    this.id = `${this.identifier}-${this.owner}`;
  }
}
