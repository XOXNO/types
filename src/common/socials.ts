import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsOptional, IsString } from 'class-validator';

export class SocialsDto {
  @ApiProperty({ example: 'https://twitter.com/example', required: false })
  @IsString()
  @IsOptional()
  twitter?: string;

  @ApiProperty({
    example: 'https://instagram.com/example',
    required: false,
  })
  @IsString()
  @IsOptional()
  instagram?: string;

  @ApiProperty({ example: 'https://example.com', required: false })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({ example: 'https://t.me/example', required: false })
  @IsString()
  @IsOptional()
  telegram?: string;

  @ApiProperty({
    example: 'https://discord.com/invite/example',
    required: false,
  })
  @IsString()
  @IsOptional()
  discord?: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  facebook?: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  youtube?: string;

  constructor(props?: Partial<SocialsDto>) {
    Object.assign(this, props);
  }
}
