import { ApiProperty } from '@nestjs/swagger';
import { ContractSignatureType } from '../../enums/passkey.enum';

export class SignatureRequest {
  @ApiProperty()
  type!: ContractSignatureType;

  @ApiProperty()
  signature!: string;

  @ApiProperty()
  message!: string;
}
