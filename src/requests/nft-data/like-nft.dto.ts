// file: dtos/like-nft.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class LikeNftDto {
  @ApiProperty({ description: 'Is favorite flag', example: true })
  isFavorite!: boolean;

  @ApiProperty({
    description: 'Collection identifier',
    example: 'EAPES-8f3c1f',
  })
  collection!: string;

  @ApiProperty({ description: 'NFT identifier', example: 'EAPES-8f3c1f-1047' })
  identifier!: string;
}
