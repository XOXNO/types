import { PickType } from '@nestjs/swagger';
import { NftDocHydrated } from '../token/nft-details.doc';
import { NftSaleInfoHydrated } from '../token/nft-sale-info';

export class ShortNftEventDoc extends PickType(NftDocHydrated, [
  'identifier',
] as const) {
  saleInfo?: Pick<NftSaleInfoHydrated, 'minBidShort' | 'paymentToken'>;
}
