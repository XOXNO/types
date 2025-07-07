import { ApiProperty } from '@nestjs/swagger';

export class FollowCollectionDto {
  @ApiProperty({
    description: 'Indicates if the collection is favorited',
    example: true,
  })
  isFavorite!: boolean;

  @ApiProperty({
    required: false,
    description: 'Collection followed, empty when unfollow',
    example: 'Mice-213123',
  })
  collection?: string;
}
