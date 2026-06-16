import { ApiProperty } from '@nestjs/swagger';

import { CosmosDbGenericFilter } from '../../cosmos-db/cosmos-db-generic-filter';
import { LendingDataType } from '../../enums/lending-data-type.enum';
import {
  GovernanceProposalKind,
  GovernanceProposalStatus,
} from '../../enums/lending-governance.enum';
import { LendingGovernanceProposalDoc } from '../../cosmos-db/documents/lending/lending-governance-proposal.doc';

export class LendingGovernanceProposalFilterCriteriaDto {
  @ApiProperty({
    required: false,
    isArray: true,
    enum: GovernanceProposalStatus,
    enumName: 'GovernanceProposalStatus',
  })
  status?: GovernanceProposalStatus[];

  @ApiProperty({
    required: false,
    isArray: true,
    enum: GovernanceProposalKind,
    enumName: 'GovernanceProposalKind',
  })
  kind?: GovernanceProposalKind[];

  @ApiProperty({ required: false, type: String, isArray: true })
  proposer?: string[];

  @ApiProperty({ required: false, type: String, isArray: true })
  assetAddress?: string[];
}

export class LendingGovernanceProposalFilter extends CosmosDbGenericFilter<LendingGovernanceProposalDoc> {
  @ApiProperty({ type: LendingGovernanceProposalFilterCriteriaDto })
  filters: {
    status?: GovernanceProposalStatus[];
    kind?: GovernanceProposalKind[];
    proposer?: string[];
    assetAddress?: string[];
    pk?: string;
  } = {
    pk: LendingDataType.GOVERNANCE_PROPOSAL,
  };

  @ApiProperty({ required: false, type: 'boolean', default: false })
  includeCount?: boolean = false;

  constructor(props?: Partial<LendingGovernanceProposalFilter>) {
    super(props);
    this.filters = {
      ...this.filters,
      ...props?.filters,
    };
    if (props) {
      const { filters: _filters, ...otherProps } = props;
      Object.assign(this, otherProps);
    }
  }
}
