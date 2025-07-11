import { OwnerDto } from '../../../common/owner.dto';
import { ChatDataType } from './chat-data-type.enum';
import { MessageDto } from './chat-message.doc';

class UserConversationDocBase {
  dataType = ChatDataType.CONVERSATION;
  chatName?: string | undefined;
  isGroupChat!: boolean;
  chatId!: string;
  message!: MessageDto;
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
}

export class UserConversationDocHydrated extends UserConversationDocBase {
  sender!: OwnerDto; //depending on the perspective this is the address of the user that holds the conversation
  receiver!: OwnerDto; //corespondent address
}
