import { ApiProperty } from '@nestjs/swagger';

import { SuccessDto } from '../../cosmos-db/documents/chat/block-user.dto';

export class SuccessWithMessageDto extends SuccessDto {
  @ApiProperty({
    description: 'Response message indicating the result of the operation',
    example: 'Operation completed successfully',
    type: String,
  })
  message!: string;
}
