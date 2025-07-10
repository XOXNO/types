import { OwnerDto } from '../../../common/owner.dto';
import { ChatDataType } from './chat-data-type.enum';

interface IType {
  dataType: ChatDataType;
  timestamp: number;
  id: string; //blockedUser
  pk: string; //blockedBy
  _ts: number;
}
export class UserBlockDoc implements IType {
  sender!: string; //blockedUser
  receiver!: string; //blockedBy

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

export class UserBlockDocHydrated implements IType {
  sender!: OwnerDto; //blockedUser
  receiver!: OwnerDto; //blockedBy

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
