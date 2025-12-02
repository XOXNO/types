import { ApiProperty } from '@nestjs/swagger';
import { ContractSignatureType } from '../../enums/passkey.enum';

export class PasskeyCreateRequest {
  @ApiProperty()
  type!: ContractSignatureType;

  @ApiProperty()
  signature!: string;

  @ApiProperty()
  publicKey!: string;
}
