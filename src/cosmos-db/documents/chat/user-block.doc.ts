import { OwnerDto } from '../../../common/owner.dto';
import { ChatDataType } from './chat-data-type.enum';

class UserBlockDocBase {
  dataType = ChatDataType.BLOCKED_USER;
  timestamp = Math.floor(Date.now() / 1000);
  id!: string; //blockedUser
  pk!: string; //blockedBy
  _ts!: number;

  constructor(props: Partial<UserBlockDoc>) {
    Object.assign(this, props);
    this.id = props.sender!;
    this.pk = props.receiver!;
  }
}
export class UserBlockDoc extends UserBlockDocBase {
  sender!: string; //blockedUser
  receiver!: string; //blockedBy

  constructor(props: Partial<UserBlockDocBase>) {
    super(props);
  }
}

export class UserBlockDocHydrated extends UserBlockDocBase {
  sender!: OwnerDto; //blockedUser
  receiver!: OwnerDto; //blockedBy

  constructor(props: Partial<UserBlockDocBase>) {
    super(props);
  }
}
