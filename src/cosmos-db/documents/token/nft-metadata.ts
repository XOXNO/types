import { ApiProperty } from '@nestjs/swagger';
import {
  NftMetadataAttributes,
  NftMetadataAttributesHydrated,
} from './nft-metadata-attributes';

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

class NftMetadataBase {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Description of an asset',
  })
  description?: string;

  @ApiProperty({
    required: false,
    type: Rarity,
    description: 'The rarity info about an asset',
  })
  rarity?: Rarity;

  @ApiProperty({
    required: false,
    type: [Object],
    description:
      'Additional custom attributes not covered by standard properties',
    example: [{ display_type: 'number', trait_type: 'Level', value: 5 }],
  })
  extraAttributes?: Record<string, unknown>[];

  constructor(props?: Partial<NftMetadata>) {
    Object.assign(this, props);
  }
}

export class NftMetadata extends NftMetadataBase {
  @ApiProperty({
    required: false,
    isArray: true,
    type: NftMetadataAttributes,
    description: 'The list of attributes for this asset',
  })
  attributes?: NftMetadataAttributes[];
}

export class NftMetadataHydrated extends NftMetadataBase {
  @ApiProperty({
    required: false,
    isArray: true,
    type: NftMetadataAttributesHydrated,
    description: 'The list of attributes for this asset',
  })
  attributes?: NftMetadataAttributesHydrated[];
}
