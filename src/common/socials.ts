import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString } from 'class-validator';

export class SocialsDto {
  @ApiProperty({ example: 'https://twitter.com/example', required: false })
  @IsString()
  twitter?: string;

  @ApiProperty({
    example: 'https://instagram.com/example',
    required: false,
  })
  @IsString()
  instagram?: string;

  @ApiProperty({ example: 'https://example.com', required: false })
  @IsString()
  website?: string;

  @ApiProperty({ example: 'https://t.me/example', required: false })
  @IsString()
  telegram?: string;

  @ApiProperty({
    example: 'https://discord.com/invite/example',
    required: false,
  })
  @IsString()
  discord?: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  facebook?: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  youtube?: string;

  constructor(props?: Partial<SocialsDto>) {
    Object.assign(this, props);
  }
}
