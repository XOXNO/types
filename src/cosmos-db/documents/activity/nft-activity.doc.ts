import { ActivityChain } from '../../../common/enums';
import { NftActivityEventSource } from './event-source.enum';
import { NftActivityData, NftMvxBuiltIn } from './nft-activity-data';
import { NftActivityType } from './nft-activity-type.enum';
import { v4 } from 'uuid';

export class NftActivityDoc {
  timestamp!: number;
  txHash!: string;
  eventIdentifier!: string;
  eventOrder?: number;
  chain: ActivityChain = ActivityChain.MULTIVERSX;
  source!: NftActivityEventSource;
  activityType!: NftActivityType;
  from!: string; // user that initiated the activity or seller in case of trades
  to!: string; // used in case of trades; buyer or receiver
  activityData!: NftActivityData | NftMvxBuiltIn;
  id!: string;
  pk!: string;
  _ts!: number;

  constructor(data: Partial<NftActivityDoc>) {
    Object.assign(this, data);
    this.id = v4();
    this.pk = this.activityData.collection;
    this.chain = this.chain || ActivityChain.MULTIVERSX;
  }
}
