import { ActivityChain } from '../../enums/common.enum';
import {
  CosmosDbGenericFilter,
  RangeFilter,
} from '../../cosmos-db/cosmos-db-generic-filter';
import { CollectionDataType } from '../../enums/collection.enum';
import { CollectionProfileDoc } from '../../cosmos-db/documents/collection/profile';

export class CollectionProfileFilter extends CosmosDbGenericFilter<CollectionProfileDoc> {
  filters: {
    dataType?: CollectionDataType;
    collection?: string[];
    type?: string[];
    owner?: string[];
    creator?: string[];
    isVisible?: boolean;
    isVerified?: boolean;
    isMintable?: boolean;
    chain?: ActivityChain[];
    range?: RangeFilter<CollectionProfileDoc>[];
  } = {
    dataType: CollectionDataType.CollectionProfile,
  };
  strictSelect?: boolean = false;

  constructor(props?: Partial<CollectionProfileFilter>) {
    super(props);

    if (props) {
      this.filters = {
        ...this.filters,
        ...props?.filters,
        chain:
          props.filters?.chain &&
          props.filters.chain.length === 1 &&
          props.filters.chain[0] === ActivityChain.MVX
            ? undefined
            : props.filters?.chain,
      };
    }

    // Assign other properties
    const { filters: _, ...otherProps } = props!;
    Object.assign(this, otherProps);
  }
}
