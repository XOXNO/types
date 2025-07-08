import { ActivityChain } from '../../common/enums';
import { CosmosDbGenericFilter } from '../../cosmos-db/cosmos-db-generic-filter';
import { CollectionDataType } from '../../cosmos-db/documents/collection/dataTypes';

export class CollectionProfileFilter extends CosmosDbGenericFilter {
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
  } = {
    dataType: CollectionDataType.CollectionProfile,
  };
  strictSelect?: boolean = false;

  constructor(props: Partial<CollectionProfileFilter>) {
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
  }
}
