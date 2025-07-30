import { ApiProperty } from '@nestjs/swagger';

export class NftMetadataAttributes {
  @ApiProperty({ required: true, type: String, example: 'Background' })
  trait_type!: string;

  @ApiProperty({ required: true, type: String, example: 'Black' })
  value!: string;

  constructor(props?: Partial<NftMetadataAttributes>) {
    this.trait_type = props?.trait_type?.toString().trim() ?? '';
    this.value = props?.value?.toString().trim() ?? '';
  }
}

export class NftMetadataAttributesHydrated extends NftMetadataAttributes {
  @ApiProperty({
    type: Number,
    description: 'Number of NFTs with this attribute combination',
    example: 42,
  })
  occurance!: number;

  @ApiProperty({
    type: Number,
    description: 'Percentage frequency of this attribute in the collection',
    example: 3.5,
  })
  frequency!: number;

  @ApiProperty({
    type: Number,
    description: 'Lowest price for NFTs with this attribute',
    example: 1.5,
  })
  floorPrice!: number;

  @ApiProperty({
    type: Number,
    description: 'Number of NFTs with this attribute currently on sale',
    example: 5,
  })
  onSaleCount!: number;

  @ApiProperty({
    type: Number,
    description: 'USD value equivalent of the floor price',
    example: 150.75,
  })
  usdValue!: number;
}
