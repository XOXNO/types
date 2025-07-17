import { v4 } from 'uuid';

import { ChatDataType } from '../../../enums/chat-data-type.enum';
import { ChatMessageContentType } from '../../../enums/chat-message-content-type.enum';
import { OwnerDto } from '../../../common/owner.dto';
import { ApiProperty } from '@nestjs/swagger';

class MessageContentReplyToDto {
  @ApiProperty({ example: 'message' })
  type!: string;
  @ApiProperty({ example: 'Hello world' })
  value!: string;
}

class ReplyToDto {
  @ApiProperty({ type: OwnerDto })
  sender!: OwnerDto;

  @ApiProperty({ type: MessageContentReplyToDto })
  content!: MessageContentReplyToDto;

  @ApiProperty({ example: 1720468991 })
  timestamp!: number;

  @ApiProperty({ example: 'b02f639a-abcf-4db8-9397-bdb3b60cef6a' })
  id!: string;
}

class MessageContentDto {
  @ApiProperty({ example: 'message' })
  type!: string;

  @ApiProperty({ example: 'Vv' })
  value!: string;

  @ApiProperty({ required: false, type: ReplyToDto })
  replyTo?: ReplyToDto;
}

export class MessageDto {
  @ApiProperty({ type: MessageContentDto })
  content!: MessageContentDto;

  @ApiProperty({ example: true })
  isRead!: boolean;

  @ApiProperty({ example: 1720468991 })
  timestamp!: number;

  sender?: string;
  isDeletedFor?: string[]; // array of user addresses
}

export interface ChatMessageContent {
  type: ChatMessageContentType;
  value: string;
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
