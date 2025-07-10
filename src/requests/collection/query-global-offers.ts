// DTO Type
import { ApiProperty, PickType } from '@nestjs/swagger';
import { OwnerDto } from '../../common/owner.dto';
import { NftOfferDoc } from '../../cosmos-db/documents/token/nft-offer.doc';
import { NftMetadataAttributes } from '../../cosmos-db/documents/token/nft-metadata-attributes';

export class GlobalOfferDto extends PickType(NftOfferDoc, [
  'offerId',
  'collection',
  'quantity',
  'paymentToken',
  'paymentTokenNonce',
  'price',
  'priceShort',
  'timestamp',
  'marketplace',
  'isActive',
] as const) {
  @ApiProperty({ type: NftMetadataAttributes, isArray: true })
  attributes!: NftMetadataAttributes[];

  @ApiProperty({ type: OwnerDto })
  owner!: OwnerDto;

  @ApiProperty({ example: 'VPRNFT-0a0ee5-156453-xoxno-globalOffer' })
  uniqueKey!: string;

  @ApiProperty({ example: 29.143 })
  usdValue!: number;
}

export class GlobalOffersDto {
  @ApiProperty({ type: GlobalOfferDto, isArray: true })
  resources!: GlobalOfferDto[];

  @ApiProperty({ example: true })
  hasMoreResults!: boolean;
}
