import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TraitInfo {
  @ApiPropertyOptional({
    description: 'The floor price for items with this trait',
    example: 1.5,
    type: Number,
  })
  floorPrice?: number;

  @ApiPropertyOptional({
    description: 'Number of items with this trait currently on sale',
    example: 12,
    type: 'integer',
  })
  onSaleCount?: number;

  @ApiPropertyOptional({
    description: 'USD value of the floor price',
    example: 150.75,
    type: Number,
  })
  usdValue?: number;

  @ApiProperty({
    description:
      'Number of times this specific attribute appears in the collection',
    example: 250,
    type: Number,
    required: true,
  })
  attributeOccurrence!: number;

  @ApiProperty({
    description: 'Frequency percentage of this attribute in the collection',
    example: 12.5,
    type: Number,
    required: true,
  })
  attributeFrequency!: number;

  @ApiProperty({
    description: 'Rarity score for this attribute (lower is rarer)',
    example: 0.125,
    type: Number,
    required: true,
  })
  attributeRarity!: number;

  @ApiProperty({
    description:
      'Number of times this specific trait value appears (legacy spelling)',
    example: 50,
    type: 'integer',
    required: true,
  })
  traitOccurance!: number;

  @ApiProperty({
    description: 'Frequency percentage of this specific trait value',
    example: 2.5,
    type: Number,
    required: true,
  })
  traitFrequency!: number;

  @ApiProperty({
    description: 'Percentage of collection items with this trait value',
    example: 2.5,
    type: Number,
    required: true,
  })
  traitOccurancePercentage!: number;

  @ApiProperty({
    description: 'Normalized rarity score for this attribute (0-1 scale)',
    example: 0.85,
    type: Number,
    required: true,
    minimum: 0,
    maximum: 1,
  })
  attributeRarityNormed!: number;
}

export class ValueFp {
  @ApiPropertyOptional({
    description: 'The floor price for items in this category',
    example: 1.5,
    type: Number,
  })
  floorPrice?: number;

  @ApiPropertyOptional({
    description: 'Number of items in this category currently on sale',
    example: 25,
    type: 'integer',
  })
  onSaleCount?: number;

  @ApiPropertyOptional({
    description: 'USD value of the floor price',
    example: 150.75,
    type: Number,
  })
  usdValue?: number;
}

export type TraitCategory = ValueFp & {
  [value: string]: TraitInfo;
};

export interface CollectionTraitMap {
  [traitCategory: string]: TraitCategory;
}
