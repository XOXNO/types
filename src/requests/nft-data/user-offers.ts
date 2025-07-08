import { ApiProperty } from '@nestjs/swagger';
import { OwnerDto } from '../../common/owner.dto';

class NftInfoDto {
  @ApiProperty({ example: 'HLSR-374950-1934' })
  identifier!: string;

  @ApiProperty({ example: 6452 })
  nonce!: number;

  @ApiProperty({ example: '37.43 EGLD' })
  name!: string;

  @ApiProperty({
    example:
      'https://arweave.net/mfjIHO6ckE8m1ck_b46BdV4ZFVGEEHJSno2MnFKuzgk/undelegate-nft.png',
  })
  url!: string;

  @ApiProperty({ example: true })
  wasProcessed!: boolean;

  @ApiProperty({
    example: {
      avifUrl: 'https://media.xoxno.com/nftmedia/HLSR-374950/receipt.avif',
      webpUrl: 'https://media.xoxno.com/nftmedia/HLSR-374950/receipt.webp',
      originalMedia: {
        contentLength: 2639394,
        contentType: 'image/png',
      },
    },
  })
  media!: Record<string, any>;

  @ApiProperty({ example: false })
  onSale!: boolean;

  @ApiProperty({ example: {} })
  saleInfo!: Record<string, any>;

  @ApiProperty({
    example: {
      rarity: {
        rank: 202,
      },
    },
  })
  metadata!: Record<string, any>;

  @ApiProperty({
    example: {
      address: 'erd1vdr8jnyhp0wlk3cwe2j5ejwkzwepexqgtnqxanravgv0d6vg59dqnfkjmm',
      profile:
        'https://media.xoxno.com/userprofile/erd1vdr8jnyhp0wlk3cwe2j5ejwkzwepexqgtnqxanravgv0d6vg59dqnfkjmm/profilePicture.webp',
      username: '@xtrading',
    },
  })
  owner!: OwnerDto;

  @ApiProperty({
    example: {
      address: 'erd1vdr8jnyhp0wlk3cwe2j5ejwkzwepexqgtnqxanravgv0d6vg59dqnfkjmm',
      profile:
        'https://media.xoxno.com/userprofile/erd1vdr8jnyhp0wlk3cwe2j5ejwkzwepexqgtnqxanravgv0d6vg59dqnfkjmm/profilePicture.webp',
      username: '@xtrading',
    },
  })
  currentOwner!: OwnerDto;

  @ApiProperty({ example: true })
  receiverIsNotOwner!: boolean;
}

export class OfferDto {
  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: 'HLSR-374950-1934' })
  identifier!: string;

  @ApiProperty({ example: 'HLSR-374950' })
  collection!: string;

  @ApiProperty({ example: 336875 })
  offerId!: number;

  @ApiProperty({ example: 'EGLD' })
  paymentToken!: string;

  @ApiProperty({ example: 0 })
  paymentTokenNonce!: number;

  @ApiProperty({ example: '36700000000000000000' })
  price!: string;

  @ApiProperty({ example: 36.7 })
  priceShort!: number;

  @ApiProperty({ example: 1721220240 })
  deadline!: number;

  @ApiProperty({ example: 1720615494 })
  timestamp!: number;

  @ApiProperty({
    type: OwnerDto,
  })
  owner!: OwnerDto;

  @ApiProperty({ example: 1 })
  quantity!: number;

  @ApiProperty({ example: 'xoxno' })
  marketplace!: string;

  @ApiProperty({ example: 1323.373 })
  usdValue!: number;

  @ApiProperty({ example: -1.95 })
  floorPriceMargin!: number;

  @ApiProperty({ example: 1 })
  floorPrice!: number;

  @ApiProperty({
    type: NftInfoDto,
  })
  nftInfo!: NftInfoDto;
}

export class GetUserOffersResponseDto {
  @ApiProperty({ example: 11 })
  count!: number;

  @ApiProperty({ example: false })
  hasMoreResults!: boolean;

  @ApiProperty({
    type: OfferDto,
    isArray: true,
  })
  resources!: OfferDto[];
}
