import { ApiProperty } from '@nestjs/swagger';

export class OwnedCollectionsDto {
  @ApiProperty({
    description: 'List of registered collections',
    example: [
      'EGIRL-443b95',
      'MONKEY-ac9bdf',
      'BLZ-1d0442',
      'MAFIALEGEN-826144',
    ],
  })
  registered!: string[];

  @ApiProperty({
    description: 'List of collections available for registration',
    example: ['XOXNO-a52799'],
  })
  availableForRegister!: string[];
}
