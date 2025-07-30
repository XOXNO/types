import { ApiProperty } from '@nestjs/swagger';

export class SignDataDto {
  @ApiProperty({
    type: String,
    description: 'Hex-encoded data to be signed',
    example: '0x48656c6c6f20576f726c64',
  })
  data!: string;

  @ApiProperty({
    type: String,
    description: 'Hex-encoded signature of the data',
    example:
      '0x5d99b6f7f6d1f73d1a26497f2b1c89b24c0993913f86e9a2d02cd69887d9c94f3c880358579d811b21dd1b7fd9bb01c1d81d10e69f0384e675c32b39643be892',
  })
  signature!: string;
}
