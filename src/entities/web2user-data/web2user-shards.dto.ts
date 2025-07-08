import { ApiProperty } from '@nestjs/swagger';

export class Web2UserShardsDto {
  @ApiProperty({
    description: 'Shards of the user',
    type: String,
    isArray: true,
  })
  shards!: string[];
}
