import { ApiProperty } from '@nestjs/swagger';

import { CollectionMintProfileDoc } from '../../cosmos-db/documents/collection/mintProfile';
import { ShortCollectionInfoDoc } from '../../cosmos-db/documents/short/short-collection-info.doc';
import { EventProfile } from '../../cosmos-db/documents/ticketing/event-profile.doc';
import { CreatorProfileDoc } from '../../cosmos-db/documents/user/user-creator-profile.doc';

export class MintingListingDto extends CollectionMintProfileDoc {
  @ApiProperty({ type: () => ShortCollectionInfoDoc })
  collectionInfo!: ShortCollectionInfoDoc;
}

export class CreatorDetailsDto extends CreatorProfileDoc {
  @ApiProperty({ type: MintingListingDto, isArray: true, required: false })
  listing?: MintingListingDto[];

  @ApiProperty({ type: EventProfile, isArray: true, required: false })
  events?: EventProfile[];
}
