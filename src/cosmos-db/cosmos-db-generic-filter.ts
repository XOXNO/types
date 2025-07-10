import { ApiProperty } from '@nestjs/swagger';

import { NftMetadataAttributes } from './documents/token/nft-metadata-attributes';

type IsLeaf<T> = [T] extends [object]
  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-function-type
    T extends Function | any[]
    ? true
    : keyof T extends never
      ? true
      : false
  : true;

type LeafKeyPaths<T, Prefix extends string = ''> = T extends string
  ? string
  : {
      [K in keyof T]-?: IsLeaf<NonNullable<T[K]>> extends true
        ? `${Prefix}${Extract<K, string>}`
        : LeafKeyPaths<NonNullable<T[K]>, `${Prefix}${Extract<K, string>}.`>;
    }[keyof T];

export class RangeFilter<T> {
  @ApiProperty({ required: false, type: 'number' })
  min?: number;

  @ApiProperty({ required: false, type: 'number' })
  max?: number;

  @ApiProperty({ required: false, type: 'string' })
  field?: LeafKeyPaths<T>;
}

export type IOrderBy<
  T,
  E = LeafKeyPaths<T>,
> = `${Extract<LeafKeyPaths<T>, E>} ${'asc' | 'desc'}`;

export class CosmosDbGenericFilter<T> {
  filters: Record<
    string,
    | object
    | boolean
    | string
    | string[]
    | number
    | number[]
    | RangeFilter<T>[]
    | NftMetadataAttributes[]
  > = {};
  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    required: false,
  })
  select?: (LeafKeyPaths<T> | keyof T)[] = [];
  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    required: false,
  })
  orderBy?: IOrderBy<T>[] = [];

  @ApiProperty({ required: false, type: 'boolean' })
  includeCount?: boolean;

  @ApiProperty({ required: false, type: 'boolean' })
  strictSelect?: boolean = false;

  @ApiProperty({ required: false, type: 'integer' })
  top?: number = 25;
  @ApiProperty({ required: false, type: 'integer' })
  skip?: number = 0;

  constructor(props?: Partial<CosmosDbGenericFilter<T>>) {
    Object.assign(this, props);
  }
}
