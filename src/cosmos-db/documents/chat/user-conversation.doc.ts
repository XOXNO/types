import { OwnerDto } from '../../../common/owner.dto';
import { ChatDataType } from './chat-data-type.enum';
import { ChatMessage } from './chat-message.doc';

class UserConversationDocBase {
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

export class UserConversationDoc extends UserConversationDocBase {
  sender!: string; //depending on the perspective this is the address of the user that holds the conversation
  receiver!: string; //corespondent address

  constructor(props: Partial<UserConversationDocBase>) {
    super(props);
  }
}

export class UserConversationDocHydrated extends UserConversationDocBase {
  sender!: OwnerDto; //depending on the perspective this is the address of the user that holds the conversation
  receiver!: OwnerDto; //corespondent address

  constructor(props: Partial<UserConversationDocBase>) {
    super(props);
  }
}
