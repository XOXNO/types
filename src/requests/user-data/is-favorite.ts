import { ApiProperty } from '@nestjs/swagger';

export class CheckLikeStatusResponseDto {
  @ApiProperty({ example: false })
  isFavorite!: boolean;
}
