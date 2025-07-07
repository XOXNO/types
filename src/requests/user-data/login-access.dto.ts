import { ApiProperty } from '@nestjs/swagger';

export class LoginAccessDto {
  @ApiProperty({
    description: 'Access token for authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token!: string;

  @ApiProperty({
    description: 'Expiration time of the token in seconds',
    example: 3600,
  })
  expires!: number;
}
