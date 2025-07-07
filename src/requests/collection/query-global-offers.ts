// DTO Type
import { ApiProperty } from '@nestjs/swagger';
import { OwnerDto } from '../../common/owner.dto';

class AttributeDto {
  @ApiProperty({ example: 'Divinity' })
  trait_type!: string;

  @ApiProperty({ example: '95' })
  value!: string;
}

class ResourceDto {
  @ApiProperty({ example: 156453 })
  offerId!: number;

  @ApiProperty({ example: 'VPRNFT-0a0ee5' })
  collection!: string;

  @ApiProperty({ example: 1 })
  quantity!: number;

  @ApiProperty({ example: 'EGLD' })
  paymentToken!: string;

  @ApiProperty({ example: 0 })
  paymentTokenNonce!: number;

  @ApiProperty({ example: '800000000000000000' })
  price!: string;

  @ApiProperty({ example: 0.8 })
  priceShort!: number;

  @ApiProperty({ type: AttributeDto, isArray: true })
  attributes!: AttributeDto[];

  @ApiProperty({ type: OwnerDto })
  owner!: OwnerDto;

  @ApiProperty({ example: 1688827110 })
  timestamp!: number;

  @ApiProperty({ example: 'xoxno' })
  marketplace!: string;

  @ApiProperty({ example: 'VPRNFT-0a0ee5-156453-xoxno-globalOffer' })
  uniqueKey!: string;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: 29.143 })
  usdValue!: number;
}

export class GlobalOffersDto {
  @ApiProperty({ type: ResourceDto, isArray: true })
  resources!: ResourceDto[];

  @ApiProperty({ example: true })
  hasMoreResults!: boolean;
}
