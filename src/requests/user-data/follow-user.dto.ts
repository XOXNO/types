import { ApiProperty } from '@nestjs/swagger';

export class FollowUserDto {
  @ApiProperty({
    description: 'Indicates if the user is favorited',
    example: true,
  })
  isFavorite!: boolean;

  @ApiProperty({
    description: 'Address of the user to favorite',
    example: 'erd1...',
  })
  addressFavorite!: string;
}
