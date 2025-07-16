import { ActivityChain } from '../../enums/common.enum';
import {
  CosmosDbGenericFilter,
  RangeFilter,
} from '../../cosmos-db/cosmos-db-generic-filter';
import { CollectionDataType } from '../../enums/collection.enum';
import { CollectionMintProfileDoc } from '../../cosmos-db/documents/collection/mintProfile';

export class CollectionMintProfileFilter extends CosmosDbGenericFilter<CollectionMintProfileDoc> {
  filters: {
    dataType?: CollectionDataType;
    collection?: string[];
    range?: RangeFilter<CollectionMintProfileDoc>[]; // this can be used to filter by mint start time
    mintToken?: string[]; // this can be used to filter by mint token identifiers()
    contractAddress?: string[];
    isSoldOut?: boolean;
    verifiedOnly?: boolean;
    activeMint?: boolean;
    chain?: ActivityChain[];
  } = {
    dataType: CollectionDataType.MintProfile,
    isSoldOut: false,
    activeMint: true,
  };
  orderBy = ['startTime desc' as const];
  strictSelect?: boolean = false;

  constructor(props: Partial<CollectionMintProfileFilter>) {
    if (!props?.filters?.range) {
      // default range filter to get only active mints
      props.filters = {
        ...props.filters,
        range: [
          { field: 'startTime', min: 1, max: Math.floor(Date.now() / 1000) },
        ],
        chain:
          props.filters?.chain &&
          props.filters.chain.length === 1 &&
          props.filters.chain[0] === ActivityChain.MVX
            ? undefined
            : props.filters?.chain,
      };
    }
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
