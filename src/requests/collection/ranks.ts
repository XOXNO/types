import { ApiProperty } from '@nestjs/swagger';

export class CollectionRanksDTO {
  @ApiProperty({ example: 'MICE-a0c447-0b99' })
  identifier!: string;

  @ApiProperty({ example: 'MiceCity #2969' })
  name!: string;

  @ApiProperty({ example: 1 })
  rank!: number;
}
