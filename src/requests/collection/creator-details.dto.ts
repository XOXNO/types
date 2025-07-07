import { ApiProperty } from '@nestjs/swagger';

import { CollectionInfoDto } from './collection-info.dto';
import { CollectionMintProfileDoc } from '../../cosmos-db/documents/collection/mintProfile';
import {
  EventProfileDoc,
  EventProfile,
} from '../../cosmos-db/documents/ticketing/event-profile.doc';
import { CreatorProfileDoc } from '../../cosmos-db/documents/user/user-creator-profile.doc';

class MintingListingDto extends CollectionMintProfileDoc {
  @ApiProperty({ type: () => CollectionInfoDto })
  collectionInfo!: CollectionInfoDto;
}

export class CreatorDetailsDto extends CreatorProfileDoc {
  @ApiProperty({ type: MintingListingDto, isArray: true })
  listing?: MintingListingDto[];

  @ApiProperty({ type: EventProfileDoc, isArray: true })
  events?: EventProfileDoc[] | EventProfile[];
}
