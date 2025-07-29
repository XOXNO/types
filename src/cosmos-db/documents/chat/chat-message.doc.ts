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

  @ApiProperty()
  sender?: string;

  @ApiProperty()
  isDeletedFor?: string[]; // array of user addresses
}

class ChatMessageDocBase {
  @ApiProperty()
  dataType = ChatDataType.MESSAGE;
  @ApiProperty()
  chatId!: string;
  @ApiProperty()
  isGroupChat!: boolean;
  @ApiProperty()
  message!: MessageDto;
  @ApiProperty()
  pk!: string;
  @ApiProperty()
  id!: string;
  @ApiProperty()
  ttl?: number;
  @ApiProperty()
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
  @ApiProperty()
  sender!: string;
  @ApiProperty()
  receiver!: string;
}

export class ChatMessageDocHydrated extends ChatMessageDocBase {
  @ApiProperty()
  sender!: OwnerDto;
  @ApiProperty()
  receiver!: OwnerDto;
}
