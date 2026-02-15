import { ApiProperty } from '@nestjs/swagger';

class CosmosPaginatedResponse<T> {
  @ApiProperty({
    description: 'Total number of documents',
    example: 100,
    required: false,
  })
  count!: number | null;

  @ApiProperty({
    description: 'Indicates if there are more documents available',
    example: true,
  })
  hasMoreResults: boolean = false;

  @ApiProperty({
    description: 'List of documents',
    isArray: true,
  })
  resources: T[] = [];

  @ApiProperty({
    description: 'Continuation token for fetching the next page',
    required: false,
    nullable: true,
  })
  continuationToken?: string;

  constructor(
    resources: T[],
    count: number | null,
    hasMoreResults: boolean,
    continuationToken?: string,
  ) {
    this.resources = resources;
    this.count = count;
    this.hasMoreResults = hasMoreResults;
    this.continuationToken = continuationToken;
  }
}

export class CosmosPaginatedSingleResponse<T> {
  @ApiProperty({
    description: 'Total number of documents',
    example: 100,
    required: false,
  })
  count!: number | null;

  @ApiProperty({
    description: 'Indicates if there are more documents available',
    example: true,
  })
  hasMoreResults: boolean = false;

  @ApiProperty({
    description: 'List of documents',
  })
  resources!: T;

  @ApiProperty({
    description: 'Continuation token for fetching the next page',
    required: false,
    nullable: true,
  })
  continuationToken?: string;

  constructor(
    resources: T,
    count: number | null,
    hasMoreResults: boolean,
    continuationToken?: string,
  ) {
    this.resources = resources;
    this.count = count;
    this.hasMoreResults = hasMoreResults;
    this.continuationToken = continuationToken;
  }
}

export function createCosmosPaginatedResponse<T>(type: new () => T) {
  class PaginatedResponse extends CosmosPaginatedResponse<T> {
    @ApiProperty({
      description: 'List of documents',
      type,
      isArray: true,
    })
    resources: T[] = [];
  }
  return PaginatedResponse;
}

export function createCosmosPaginatedSingleResponse<T>(type: new () => T) {
  class PaginatedResponse extends CosmosPaginatedSingleResponse<T> {
    @ApiProperty({
      description: 'List of documents',
      type,
    })
    resources!: T;
  }
  return PaginatedResponse;
}
