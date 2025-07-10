import { OwnerDto } from '../../../common/owner.dto';
import { ChatDataType } from './chat-data-type.enum';
import { ChatMessage } from './chat-message.doc';

interface IType {
  dataType: ChatDataType;
  chatName?: string;
  isGroupChat: boolean;
  chatId: string; //chat id
  message: ChatMessage;
  deleteTimestamp?: number;
  unreadCount?: number;
  id: string; //id
  pk: string; //pk
  _ts: number; //timestamp
}

export class UserConversationDoc implements IType {
  sender!: string; //depending on the perspective this is the address of the user that holds the conversation
  receiver!: string; //corespondent address

  dataType = ChatDataType.CONVERSATION;
  chatName?: string | undefined;
  isGroupChat!: boolean;
  chatId!: string;
  message!: ChatMessage;
  deleteTimestamp?: number | undefined;
  unreadCount?: number | undefined;
  id!: string;
  pk!: string;
  _ts!: number;

  constructor(props: Partial<UserConversationDoc>) {
    Object.assign(this, props);
    this.id = props.chatId!;
    this.pk = props.sender!;
  }
}

export class UserConversationDocHydrated implements IType {
  sender!: OwnerDto;
  receiver!: OwnerDto;

  dataType = ChatDataType.CONVERSATION;
  chatName?: string | undefined;
  isGroupChat!: boolean;
  chatId!: string;
  message!: ChatMessage;
  deleteTimestamp?: number | undefined;
  unreadCount?: number | undefined;
  id!: string;
  pk!: string;
  _ts!: number;

  constructor(props: Partial<UserConversationDocHydrated>) {
    Object.assign(this, props);
  }
}
