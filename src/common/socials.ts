import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class SocialsDto {
  @ApiProperty({ example: 'https://twitter.com/example', required: false })
  twitter?: string;

  @ApiProperty({
    example: 'https://instagram.com/example',
    required: false,
  })
  instagram?: string;

  @ApiProperty({ example: 'https://example.com', required: false })
  website?: string;

  @ApiProperty({ example: 'https://t.me/example', required: false })
  telegram?: string;

  @ApiProperty({
    example: 'https://discord.com/invite/example',
    required: false,
  })
  discord?: string;

  @ApiProperty({ example: '', required: false })
  facebook?: string;

  @ApiProperty({ example: '', required: false })
  youtube?: string;

  constructor(props?: Partial<SocialsDto>) {
    Object.assign(this, props);
  }
}
