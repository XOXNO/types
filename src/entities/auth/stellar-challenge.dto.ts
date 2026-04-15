import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

/**
 * SEP-10 Web Authentication challenge response.
 *
 * The server returns an unsigned (server-signed only) Stellar transaction
 * envelope that the client must countersign with the user's secret key.
 * The countersigned XDR is then sent back via POST /user/login as
 * `data.signedXdr` for verification.
 *
 * Spec: https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md
 */
export class StellarChallengeResponseDto {
  @ApiProperty({
    description:
      'Base64-encoded Stellar transaction envelope XDR, server-signed',
  })
  @IsString()
  transaction!: string;

  @ApiProperty({
    description:
      'Stellar network passphrase this challenge is valid on (client must match)',
    example: 'Test SDF Network ; September 2015',
  })
  @IsString()
  networkPassphrase!: string;
}
