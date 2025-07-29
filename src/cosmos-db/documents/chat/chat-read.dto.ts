import { ApiProperty } from '@nestjs/swagger';
import { ChatDataType } from '../../../enums/chat-data-type.enum';

export class ChatReadDto {
  @ApiProperty()
  dataType = ChatDataType.READ;
  @ApiProperty()
  chatId!: string;
  @ApiProperty()
  lastRead!: number;
  @ApiProperty()
  reader!: string;
}
