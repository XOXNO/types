import { ApiProperty } from '@nestjs/swagger';
import {
  RangeFilter,
  CosmosDbGenericFilter,
} from '../../cosmos-db/cosmos-db-generic-filter';
import { CollectionDataType } from '../../cosmos-db/documents/collection/dataTypes';
import { NftMetadataAttributes } from '../../cosmos-db/documents/token/nft-metadata-attributes';
import { GlobalOfferDoc } from '../../cosmos-db/documents/collection/globalOffer';

export class CollectionOffersFilterCriteriaDto {
  @ApiProperty({
    required: false,
    enum: CollectionDataType,
    enumName: 'CollectionDataType',
    example: CollectionDataType.GlobalOffer,
  })
  dataType?: CollectionDataType;

  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
    example: ['collection1'],
  })
  collection?: string[];

  @ApiProperty({ required: false, type: Number, isArray: true, example: [123] })
  offerId?: number[];

  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
    example: ['owner1'],
  })
  owner?: string[];

  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
    example: ['marketplace1'],
  })
  marketplace?: string[];

  @ApiProperty({ required: false, type: RangeFilter, isArray: true })
  range?: RangeFilter<GlobalOfferDoc>[];

  @ApiProperty({ required: false, type: NftMetadataAttributes, isArray: true })
  attributes?: NftMetadataAttributes[];

  @ApiProperty({ required: false, type: Boolean, example: true })
  isActive?: boolean;

  @ApiProperty({ required: false, type: Boolean, example: true })
  withAttributes?: boolean;
}

export class CollectionOffersFilter extends CosmosDbGenericFilter {
  @ApiProperty({
    type: CollectionOffersFilterCriteriaDto,
    required: false,
  })
  filters: {
    dataType?: CollectionDataType;
    collection?: string[];
    offerId?: number[];
    owner?: string[];
    marketplace?: string[];
    range?: RangeFilter<GlobalOfferDoc>[];
    attributes?: NftMetadataAttributes[];
    isActive?: boolean;
    withAttributes?: boolean;
  } = {
    dataType: CollectionDataType.GlobalOffer,
    // isActive: true,
  };

  constructor(props: Partial<CollectionOffersFilter>) {
    super(props);
    this.filters = {
      ...this.filters,
      ...props?.filters,
    };
    // Assign other properties
    const { filters: _, ...otherProps } = props;
    Object.assign(this, otherProps);
  }
}
