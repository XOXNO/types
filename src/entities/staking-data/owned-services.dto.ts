import { ApiProperty } from '@nestjs/swagger';
import { CollectionMintProfileDocHydrated } from '../../cosmos-db/documents/collection/mintProfile';
import { StakingSummary } from '../../cosmos-db/documents/staking/staking-pool-doc';
import { EventProfile } from '../../cosmos-db/documents/ticketing/event-profile.doc';
import { CreatorProfileDoc } from '../../cosmos-db/documents/user/user-creator-profile.doc';

export class OwnedServicesDto {
  @ApiProperty({ type: CollectionMintProfileDocHydrated, isArray: true })
  mintProfiles!: CollectionMintProfileDocHydrated[];

  @ApiProperty({ type: StakingSummary, isArray: true })
  stakingPools!: StakingSummary[];

  @ApiProperty({ type: EventProfile, isArray: true })
  events!: EventProfile[];

  @ApiProperty({ type: CreatorProfileDoc })
  creatorProfile!: CreatorProfileDoc;

  @ApiProperty({ example: 'erd1312', type: String })
  address!: string;
}
