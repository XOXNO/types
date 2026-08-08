export enum StellarLendingDataType {
  ASSET = 'asset',
  HUB = 'hub',
  HUB_ASSET = 'hubAsset',
  SPOKE = 'spoke',
  SPOKE_ASSET = 'spokeAsset',
  ACCOUNT_POSITION = 'accountPosition',
  /**
   * Deliberately not `governanceProposal`: MVX lending uses that partition key
   * with the same `operationId` document id and no chain discriminator, so the
   * two chains' proposals would be indistinguishable in one partition.
   */
  GOVERNANCE_PROPOSAL = 'stellarGovernanceProposal',
  /** Per-contract config + admin state, keyed by contract address. */
  CONTRACT_CONFIG = 'contractConfig',
  /** One row per (contract, role, account) access-control grant. */
  CONTRACT_ROLE = 'contractRole',
  /** One row per (account, delegate) position-authorization grant. */
  ACCOUNT_DELEGATE = 'accountDelegate',
  /** One row per Blend pool the controller has approved or revoked. */
  BLEND_POOL = 'blendPool',
  CURSOR = 'cursor',
}
