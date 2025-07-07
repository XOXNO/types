import { Socials } from '../../../common/socials';
import { UserDataType } from './user-data.type';

export class CreatorProfileDoc {
  dataType: UserDataType = UserDataType.CreatorProfile;
  address!: string;
  name!: string; // editable by creator
  creatorTag!: string; // unique, not editable
  contractAddress!: string; // for regular NFT creators
  ticketingContractAddress!: string; // for ticketing creators
  profile!: string; // TOOD: Add default picture
  banner!: string; // TODO: Add default picture
  joinedDate: number = Math.floor(Date.now() / 1000);
  description?: string;
  socials?: Socials;
  id!: string;
  _ts!: number;

  constructor(props?: Partial<CreatorProfileDoc>) {
    Object.assign(this, props);
    this.id = `${this.address}-${this.dataType}`;
  }
}
