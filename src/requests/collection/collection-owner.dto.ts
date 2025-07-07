// file: dtos/collection-owner.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CollectionOwnerDto {
  @ApiProperty({
    description: 'Owner address',
    example: 'erd10ugfytgdndw5qmnykemjfpd7xrjs63f0r2qjhug0ek9gnfdjxq4s8qjvcx',
  })
  owner!: string;
}
