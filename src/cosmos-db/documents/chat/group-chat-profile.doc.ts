import { ChatDataType } from '../../../enums/chat-data-type.enum';

export class GroupChatProfileDoc {
  dataType: string = ChatDataType.GROUP_CHAT_PROFILE;
  name!: string;
  chatId!: string;
  description?: string;
  profile!: string; // TODO: Add defalt StaticConfig.getDefaultProfilePicture();
  owner!: string;
  collection: string[] = [];
  pk!: string;
  id!: string;
  _ts!: number;

  constructor(props?: Partial<GroupChatProfileDoc>) {
    Object.assign(this, props);
    this.pk = this.chatId;
    this.id = `${this.chatId}-${this.dataType}`;
  }
}
