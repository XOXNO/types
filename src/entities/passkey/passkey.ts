import { ApiProperty } from '@nestjs/swagger';

export class Passkey {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  publicKey!: string;
}
