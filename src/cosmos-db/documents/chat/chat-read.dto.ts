import { ChatDataType } from '../../../enums/chat-data-type.enum';

export class ChatReadDto {
  dataType!: ChatDataType.READ;
  chatId!: string;
  lastRead!: number;
  reader!: string;
}
