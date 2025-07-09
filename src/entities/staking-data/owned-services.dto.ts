import { ApiProperty } from '@nestjs/swagger';
import { CollectionMintProfileDoc } from '../../cosmos-db/documents/collection/mintProfile';
import { StakingSummary } from '../../cosmos-db/documents/staking/staking-pool-doc';
import { EventProfileDoc } from '../../cosmos-db/documents/ticketing/event-profile.doc';
import { CreatorProfileDoc } from '../../cosmos-db/documents/user/user-creator-profile.doc';

export class OwnedServicesDto {
  @ApiProperty({ type: CollectionMintProfileDoc, isArray: true })
  mintProfiles!: CollectionMintProfileDoc[];

  @ApiProperty({ type: StakingSummary, isArray: true })
  stakingPools!: StakingSummary[];

  @ApiProperty({ type: EventProfileDoc, isArray: true })
  events!: EventProfileDoc[];

  @ApiProperty({ type: CreatorProfileDoc })
  creatorProfile!: CreatorProfileDoc;

  @ApiProperty({ example: 'erd1312', type: String })
  address!: string;
}
