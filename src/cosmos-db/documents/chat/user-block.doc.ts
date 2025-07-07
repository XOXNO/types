import { ChatDataType } from './chat-data-type.enum';

export class UserBlockDoc {
  dataType: string = ChatDataType.BLOCKED_USER;
  sender!: string; //blockedUser
  receiver!: string; //blockedBy
  timestamp: number = Math.floor(Date.now() / 1000);
  id!: string; //blockedUser
  pk!: string; //blockedBy
  _ts!: number;

  constructor(props: Partial<UserBlockDoc>) {
    Object.assign(this, props);
    this.id = props.sender!;
    this.pk = props.receiver!;
  }
}
