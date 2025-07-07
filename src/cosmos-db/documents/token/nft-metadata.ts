import { ApiProperty } from '@nestjs/swagger';
import { NftMetadataAttributes } from './nft-metadata-attributes';

class Rarity {
  @ApiProperty({
    type: Number,
    description:
      'The rarity rank of an asset, the smaller represents the rarest',
  })
  rank!: number;
  @ApiProperty({
    required: false,
    type: Number,
    description: 'Rarity score on an asset',
  })
  rarityScore?: number;
}

export class NftMetadata {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Description of an asset',
  })
  description?: string;

  @ApiProperty({
    required: false,
    isArray: true,
    type: NftMetadataAttributes,
    description: 'The list of attributes for this asset',
  })
  attributes?: NftMetadataAttributes[];

  @ApiProperty({
    required: false,
    type: Rarity,
    description: 'The rarity info about an asset',
  })
  rarity?: Rarity;

  extraAttributes?: Record<string, unknown>[];

  constructor(props?: Partial<NftMetadata>) {
    Object.assign(this, props);
  }
}
