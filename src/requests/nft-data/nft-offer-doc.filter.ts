import { ApiProperty } from '@nestjs/swagger';
import {
  RangeFilter,
  CosmosDbGenericFilter,
} from '../../cosmos-db/cosmos-db-generic-filter';
import { TokenDataType } from '../../enums/token-data.enum';
import { NftOfferDoc } from '../../cosmos-db/documents/token/nft-offer.doc';

export class NftOfferDocFilterCriteria {
  @ApiProperty({ required: false, type: Boolean, isArray: true })
  isActive?: boolean;

  @ApiProperty({ required: false, type: String, isArray: true })
  identifier?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  collection?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  owner?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  nftOwner?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  marketplace?: string[];

  @ApiProperty({ required: false, type: RangeFilter, isArray: true })
  range?: RangeFilter<NftOfferDoc>[];
}

export class NftOfferDocFilter extends CosmosDbGenericFilter<NftOfferDoc> {
  @ApiProperty({
    type: NftOfferDocFilterCriteria,
  })
  filters: {
    dataType?: string[];
    isActive?: boolean;
    identifier?: string[];
    collection?: string[];
    owner?: string[];
    marketplace?: string[];
    range?: RangeFilter<NftOfferDoc>[];
  } = {
    dataType: [TokenDataType.Offer],
  };

  @ApiProperty({
    type: 'array',
    items: { type: 'string', enum: ['priceShort desc'] },
    required: false,
  })
  orderBy? = ['priceShort desc' as const];

  constructor(props?: Partial<NftOfferDocFilter>) {
    super(props);
    this.filters = {
      ...this.filters,
      ...props?.filters,
    };
    // Assign other properties
    const { filters: _, ...otherProps } = props!;
    Object.assign(this, otherProps);

    this.setPk();
  }

  private setPk() {
    if (!this.filters) return;

    const uniqueCollections = new Set<string>();
    const { collection, identifier } = this.filters;
    if ((collection?.length ?? 0) > 0) {
      collection!.forEach((coll) => {
        uniqueCollections.add(coll);
      });
    }
    if ((identifier?.length ?? 0) > 0) {
      identifier!.forEach((id) => {
        // Extract collection ticker from identifier (format: COLLECTION-NONCE)
        const collectionTicker = id.split('-').slice(0, -1).join('-');
        uniqueCollections.add(collectionTicker);
      });
    }
    this.filters.collection = Array.from(uniqueCollections);
  }
}
