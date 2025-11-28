import { ApiProperty } from '@nestjs/swagger';

export class SignMessageFailureDto {
  @ApiProperty({ example: false })
  success!: false;

  @ApiProperty()
  reason!: string;
}

export class SignMessageSuccessDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  authenticatorData!: string;

  @ApiProperty()
  clientDataJSON!: string;

  @ApiProperty()
  signature!: string;
}

export type SignMessageDto = SignMessageSuccessDto | SignMessageFailureDto;
