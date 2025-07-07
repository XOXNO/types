import { ApiProperty } from '@nestjs/swagger';

export class CosmosPaginatedResponse<T> {
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
  hasMoreResults!: boolean;

  @ApiProperty({
    description: 'List of documents',
    isArray: true,
  })
  resources: T[] = [];

  constructor(resources: T[], count: number | null, hasMoreResults: boolean) {
    this.resources = resources;
    this.count = count;
    this.hasMoreResults = hasMoreResults;
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
