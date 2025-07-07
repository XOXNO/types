import { ActivityChain } from '../../../common/enums';
import { SocialsDto } from '../../../common/socials';
import { UserDataType } from './user-data.type';
import { UserDeposit } from './user-deposit';

export class UserProfileDoc {
  dataType: UserDataType = UserDataType.UserProfile;
  address: string = '';
  isBanned: boolean = false;
  isVerified: boolean = false;
  socials: SocialsDto = new SocialsDto();
  followCount: number = 0;
  joinedDate: number = Math.floor(Date.now() / 1000);
  profile!: string; // TODO: Add default image
  banner!: string; // TODO: Add default iamge
  description: string = '';
  herotag: string = '';
  isCreator: boolean = false;
  isPoolOwner: boolean = false;
  shard: number = 0;
  userDeposit: UserDeposit[] = [];
  chain: ActivityChain = ActivityChain.MULTIVERSX;
  _ts: number = 0;
  id: string = '';

  constructor(props?: Partial<UserProfileDoc>) {
    Object.assign(this, props);
    this.id = `${this.address}-${this.dataType}`;
  }
}
