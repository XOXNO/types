import { ApiProperty } from '@nestjs/swagger';
import { ActivityChain } from '../../../enums/common.enum';

import { NftActivityEventSource } from '../../../enums/event-source.enum';
import {
  NftActivityData,
  NftActivityDataHydrated,
} from '../../../requests/nft-activity-data/nft-activity-data';
import { NftActivityType } from '../../../enums/nft-activity-type.enum';
import { OwnerDto } from '../../../common/owner.dto';

class NftActivityDocBase {
  @ApiProperty({
    example: 1640995200,
    description: 'Unix timestamp when the activity occurred',
  })
  timestamp!: number;

  @ApiProperty({
    example:
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    description: 'Transaction hash on the blockchain',
  })
  txHash!: string;

  @ApiProperty({
    example: 'trade',
    description: 'Event identifier from the blockchain',
  })
  eventIdentifier!: string;

  @ApiProperty({
    example: 1,
    description: 'Order of the event within the transaction',
    required: false,
  })
  eventOrder?: number;

  @ApiProperty({
    example: ActivityChain.MVX,
    enum: ActivityChain,
    description: 'Blockchain network where the activity occurred',
  })
  chain: ActivityChain = ActivityChain.MVX;

  @ApiProperty({
    example: NftActivityEventSource.XOXNO_MARKETPLACE,
    enum: NftActivityEventSource,
    description: 'Source platform or marketplace of the activity',
  })
  source!: NftActivityEventSource;

  @ApiProperty({
    example: NftActivityType.TRADE,
    enum: NftActivityType,
    description: 'Type of NFT activity performed',
  })
  activityType!: NftActivityType;

  @ApiProperty({
    example: 'abc123-def456-ghi789',
    description: 'Unique identifier for the activity document',
  })
  id!: string;

  @ApiProperty({
    example: 'COLLECTION-1234',
    description: 'Partition key for the document (collection identifier)',
  })
  pk!: string;

  @ApiProperty({
    example: 1640995200,
    description: 'Cosmos DB timestamp for document versioning',
  })
  _ts!: number;

  constructor(props?: Partial<NftActivityDoc>) {
    Object.assign(this, props);
    this.id = `${this.txHash}-${this.eventIdentifier}-${this.eventOrder ?? 0}`;
    this.chain = this.chain || ActivityChain.MVX;
  }
}

export class NftActivityDoc extends NftActivityDocBase {
  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
    description:
      'Address of the user who initiated the activity or seller in case of trades',
  })
  from!: string;

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
    description: 'Address used in case of trades; buyer or receiver',
  })
  to!: string;

  @ApiProperty({
    description:
      'Activity data containing details about the NFT transaction or built-in operation',
  })
  activityData!: NftActivityData;

  constructor(props?: Partial<NftActivityDoc>) {
    super(props);
    this.pk = this.activityData.collection;
  }
}

export class NftActivityDocHydrated extends NftActivityDocBase {
  from!: OwnerDto;
  to!: OwnerDto;
  activityData!: NftActivityDataHydrated;

  constructor(props?: Partial<NftActivityDoc>) {
    super(props);
    this.pk = this.activityData.collection;
  }
}
