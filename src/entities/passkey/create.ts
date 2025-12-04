import { ApiProperty } from '@nestjs/swagger';
import { ContractSignatureType } from '../../enums/passkey.enum';

export class ContractSignatureRequest {
  @ApiProperty()
  type!: ContractSignatureType;

  @ApiProperty()
  signature!: string;
}

export class SignatureRequest extends ContractSignatureRequest {
  @ApiProperty()
  message!: string;
}
