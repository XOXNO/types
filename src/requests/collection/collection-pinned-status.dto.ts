import { ApiProperty } from '@nestjs/swagger';

export class CollectionPinnedStatusDto {
  @ApiProperty({
    description: 'Collection ticker',
    type: String,
  })
  collection!: string;

  @ApiProperty({
    description: 'Pinned status',
    type: Boolean,
  })
  status!: boolean;
}
