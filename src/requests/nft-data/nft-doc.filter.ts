import { ApiProperty } from '@nestjs/swagger';
import { ActivityChain } from '../../common/enums';
import { NftMetadataAttributes } from '../../cosmos-db/documents/token/nft-metadata-attributes';
import { TokenDataType } from '../../cosmos-db/documents/token/token-data.enum';
import {
  CosmosDbGenericFilter,
  RangeFilter,
} from '../../cosmos-db/cosmos-db-generic-filter';
import { XoxnoAuctionTypeString } from '../../entities/xoxno-marketplace-sc/xoxno-auction-type.enum';
import { NftProps } from '../../cosmos-db/documents/token/nft-details.doc';

export class SaleInfoFilterDto {
  @ApiProperty({ required: false, type: String, isArray: true })
  seller?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  paymentToken?: string[];

  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
    example: ['xoxno'],
  })
  marketplace?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  auctionType?: XoxnoAuctionTypeString[];
}

export class MetadataAttributesDto {
  @ApiProperty({ required: false, type: NftMetadataAttributes, isArray: true })
  attributes?: NftMetadataAttributes[];
}

export class NftDocFilterCriteriaDto {
  @ApiProperty({ required: false, type: String, isArray: true })
  dataType?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  identifier?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  collection?: string[];

  @ApiProperty({ required: false, type: Number, isArray: true })
  nonce?: number[];

  @ApiProperty({ required: false, type: String, isArray: true })
  type?: string[];

  @ApiProperty({ required: false, type: Boolean, example: true })
  onSale?: boolean;

  @ApiProperty({ required: false, type: String, isArray: true })
  owner?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  currentOwner?: string[];

  @ApiProperty({ required: false, type: SaleInfoFilterDto })
  saleInfo?: SaleInfoFilterDto;

  @ApiProperty({ required: false, type: RangeFilter, isArray: true })
  range?: RangeFilter<NftProps>[];

  @ApiProperty({ required: false, type: MetadataAttributesDto })
  metadata?: MetadataAttributesDto;

  @ApiProperty({ required: false, type: Boolean, example: true })
  wasProcessed?: boolean;

  @ApiProperty({ required: false, type: Boolean, example: true })
  cp_staked?: boolean;

  @ApiProperty({ required: false, type: Boolean, example: true })
  activeAuction?: boolean;

  @ApiProperty({ required: false, type: Boolean, example: true })
  verifiedOnly?: boolean;

  @ApiProperty({ required: false, type: Boolean, example: true })
  sftOriginalDoc?: boolean;
}

export class NftDocFilter extends CosmosDbGenericFilter<NftProps> {
  @ApiProperty({
    type: NftDocFilterCriteriaDto,
  })
  filters: {
    dataType?: string[];
    identifier?: string[];
    collection?: string[];
    chain?: ActivityChain[];
    nonce?: number[];
    type?: string[];
    onSale?: boolean;
    owner?: string[];
    currentOwner?: string[];
    saleInfo?: {
      seller?: string[];
      paymentToken?: string[];
      marketplace?: string[];
      auctionType?: XoxnoAuctionTypeString[];
    };
    range?: RangeFilter<NftProps>[];
    metadata?: {
      attributes?: NftMetadataAttributes[];
    };
    wasProcessed?: boolean;
    cp_staked?: boolean; // computed property
    activeAuction?: boolean;
    verifiedOnly?: boolean;
    sftOriginalDoc?: boolean; // property to build custom filter to exclude duplicate onSale SFTs
  } = {
    dataType: [TokenDataType.Nft],
  };
  @ApiProperty({ required: false, type: 'boolean' })
  strictSelect?: boolean = false;

  @ApiProperty({ required: false, type: 'boolean' })
  includeCount?: boolean = false;

  @ApiProperty({ required: false, type: 'boolean' })
  applyNftExtraDetails?: boolean = true;

  constructor(props: Partial<NftDocFilter>) {
    super(props);
    this.filters = {
      ...this.filters,
      ...props?.filters,
      chain:
        props.filters?.chain &&
        props.filters.chain.length === 1 &&
        props.filters.chain[0] === ActivityChain.MULTIVERSX
          ? undefined
          : props.filters?.chain,
    };
    // Assign other properties
    const { filters: _, ...otherProps } = props;
    Object.assign(this, otherProps);

    this.applySelectPropertyLogic(props);
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

  private applySelectPropertyLogic(props?: Partial<NftDocFilter>) {
    if (Array.isArray(this.select)) {
      const defaultProperties = this.getDefaultProperties();
      this.select = this.select.concat(defaultProperties);
    }

    if (this.strictSelect) {
      this.select = props?.select;
    }
  }

  private getDefaultProperties() {
    return [
      'dataType',
      'collection',
      'identifier',
      'id',
      'name',
      'nonce',
      'type',
      'url',
      'onSale',
      'balance',
      'balanceLong',
      'wasProcessed',
      'media.avifUrl',
      'media.webpUrl',
      'media.originalMedia.contentType',
      'metadata.rarity.rank',
      'owner',
      'currentOwner',
      'royalties',
      '_ts',
    ] as const;
  }
}
