import { ApiProperty } from '@nestjs/swagger';

export class SignDataDto {
  @ApiProperty({ example: 'hex-encoded-data' })
  data!: string;

  @ApiProperty({ example: 'hex-encoded-signature' })
  signature!: string;
}
