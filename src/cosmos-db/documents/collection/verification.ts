import { ApiProperty } from '@nestjs/swagger';
import { CollectionDataType } from './dataTypes';

export class CollectionVerificationDoc {
  @ApiProperty({
    description: 'Data type identifier for the collection verification',
    enum: CollectionDataType,
    example: CollectionDataType.CollectionVerification,
  })
  dataType: CollectionDataType = CollectionDataType.CollectionVerification;

  @ApiProperty({
    description: 'Collection identifier',
    example: 'COLLECTION-123456',
  })
  collection!: string;

  @ApiProperty({
    description: 'Whether the collection is verified',
    example: true,
  })
  isVerified!: boolean;

  @ApiProperty({
    description: 'Whether the collection is visible to the public',
    example: true,
  })
  isVisible!: boolean;

  @ApiProperty({
    description: 'Address of the last action performer',
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
  })
  lastActionAddress!: string;

  @ApiProperty({
    description: 'Timestamp of the last action (Unix timestamp)',
    example: 1640995200,
  })
  lastActionTimestamp!: number;

  @ApiProperty({
    description: 'Unique identifier for the document',
    example: 'COLLECTION-123456-collectionVerification',
  })
  id!: string;

  constructor(props?: Partial<CollectionVerificationDoc>) {
    Object.assign(this, props);
    this.id = `${this.collection}-${this.dataType}`;
  }
}
