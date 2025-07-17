import { ApiProperty } from '@nestjs/swagger';

import { ShortCollectionInfoDoc } from '../../cosmos-db/documents/short/short-collection-info.doc';
import { CollectionMintProfileDoc } from '../../cosmos-db/documents/collection/mintProfile';
import {
  EventProfileDoc,
  EventProfile,
} from '../../cosmos-db/documents/ticketing/event-profile.doc';
import { CreatorProfileDoc } from '../../cosmos-db/documents/user/user-creator-profile.doc';

class MintingListingDto extends CollectionMintProfileDoc {
  @ApiProperty({ type: () => ShortCollectionInfoDoc })
  collectionInfo!: ShortCollectionInfoDoc;
}

export class CreatorDetailsDto extends CreatorProfileDoc {
  @ApiProperty({ type: MintingListingDto, isArray: true, required: false })
  listing?: MintingListingDto[];

  @ApiProperty({ type: EventProfileDoc, isArray: true, required: false })
  events?: EventProfileDoc[] | EventProfile[];
}
