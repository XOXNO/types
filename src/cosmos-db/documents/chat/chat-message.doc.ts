import { v4 } from 'uuid';

import { ChatDataType } from './chat-data-type.enum';
import { ChatMessageContentType } from './chat-message-content-type.enum';
import { OwnerDto } from '../../../common/owner.dto';

class ChatMessageDocBase {
  dataType = ChatDataType.MESSAGE;
  chatId!: string;
  isGroupChat!: boolean;
  message!: ChatMessage;
  pk!: string;
  id!: string;
  ttl?: number;
  _ts?: number;

  constructor(props: Partial<ChatMessageDoc>) {
    Object.assign(this, props);
    this.id = v4();
    this.pk = props.chatId!;
    if (this.isGroupChat) {
      this.ttl = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
    }
  }
}

export class ChatMessageDoc extends ChatMessageDocBase {
  sender!: string;
  receiver!: string;

  constructor(props: Partial<ChatMessageDocBase>) {
    super(props);
  }
}

export class ChatMessageDocHyrated extends ChatMessageDocBase {
  sender!: OwnerDto;
  receiver!: OwnerDto;

  constructor(props: Partial<ChatMessageDocBase>) {
    super(props);
  }
}

export interface ChatMessage {
  content: ChatMessageContent;
  timestamp: number;
  sender?: string; // used for conversation last message
  isRead?: boolean;
  replyTo?: string;
  isDeletedFor?: string[]; // array of user addresses
}

export interface ChatMessageContent {
  type: ChatMessageContentType;
  value: string;
}

export interface ChatMessageDetails {
  dataType: string;
  chatId: string;
  isGroupChat: boolean;
  message: ChatMessage;
  sender: {
    address: string;
    username: string;
    profile: string;
  };
  receiver: {
    address: string;
    username: string;
    profile: string;
  };
  chatName: string;
  id: string;
}
