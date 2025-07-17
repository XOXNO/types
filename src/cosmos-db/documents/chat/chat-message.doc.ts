import { v4 } from 'uuid';

import { ApiProperty } from '@nestjs/swagger';
import { OwnerDto } from '../../../common/owner.dto';
import { ChatDataType } from '../../../enums/chat-data-type.enum';
import { ChatMessageContentDto } from './chat-message-content.dto';

export class MessageDto {
  @ApiProperty({ type: ChatMessageContentDto })
  content!: ChatMessageContentDto;

  @ApiProperty({ example: true })
  isRead!: boolean;

  @ApiProperty({ example: 1720468991 })
  timestamp!: number;

  sender?: string;
  isDeletedFor?: string[]; // array of user addresses
}

class ChatMessageDocBase {
  dataType = ChatDataType.MESSAGE;
  chatId!: string;
  isGroupChat!: boolean;
  message!: MessageDto;
  pk!: string;
  id!: string;
  ttl?: number;
  _ts?: number;

  constructor(props?: Partial<ChatMessageDoc>) {
    Object.assign(this, props);
    this.id = v4();
    this.pk = props!.chatId!;
    if (this.isGroupChat) {
      this.ttl = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
    }
  }
}

export class ChatMessageDoc extends ChatMessageDocBase {
  sender!: string;
  receiver!: string;
}

export class ChatMessageDocHydrated extends ChatMessageDocBase {
  sender!: OwnerDto;
  receiver!: OwnerDto;
}
