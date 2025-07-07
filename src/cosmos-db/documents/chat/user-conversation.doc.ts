import { ChatDataType } from './chat-data-type.enum';
import { ChatMessage } from './chat-message.doc';

export class UserConversationDoc {
  dataType: string = ChatDataType.CONVERSATION;
  chatName?: string;
  isGroupChat!: boolean;
  sender!: string; //depending on the perspective this is the address of the user that holds the conversation
  receiver!: string; //corespondent address
  chatId!: string; //chat id
  message!: ChatMessage;
  deleteTimestamp?: number;
  unreadCount?: number;
  id!: string; //id
  pk!: string; //pk
  _ts!: number; //timestamp

  constructor(props: Partial<UserConversationDoc>) {
    Object.assign(this, props);
    this.id = props.chatId!;
    this.pk = props.sender!;
  }
}
