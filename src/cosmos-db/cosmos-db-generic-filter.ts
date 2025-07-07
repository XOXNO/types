import { ApiProperty } from '@nestjs/swagger';

import { NftMetadataAttributes } from './documents/token/nft-metadata-attributes';

export class RangeFilter {
  @ApiProperty({ required: false, type: 'number' })
  min?: number;

  @ApiProperty({ required: false, type: 'number' })
  max?: number;

  @ApiProperty({ required: false, type: 'string' })
  field?: string;
}

export class CosmosDbGenericFilter {
  filters: Record<
    string,
    | object
    | boolean
    | string
    | string[]
    | number
    | number[]
    | RangeFilter[]
    | NftMetadataAttributes[]
  > = {};
  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    required: false,
  })
  select?: string[] = [];
  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    required: false,
  })
  orderBy?: string[] = [];

  @ApiProperty({ required: false, type: 'boolean' })
  includeCount?: boolean;

  @ApiProperty({ required: false, type: 'boolean' })
  strictSelect?: boolean = false;

  @ApiProperty({ required: false, type: 'integer' })
  top?: number = 25;
  @ApiProperty({ required: false, type: 'integer' })
  skip?: number = 0;

  constructor(props?: Partial<CosmosDbGenericFilter>) {
    Object.assign(this, props);
  }
}
