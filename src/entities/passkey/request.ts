import { ApiProperty } from '@nestjs/swagger';

export class SignMessageRequest {
  @ApiProperty()
  message!: string;
}
