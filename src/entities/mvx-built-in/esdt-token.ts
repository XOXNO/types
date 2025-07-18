import { EsdtTokenType, EsdtTokenSubType } from '../../enums';

export class EsdtTokenProperties {
  tokenIdentifier = '';
  name = '';
  type!: EsdtTokenType;
  subType!: EsdtTokenSubType;
  owner = '';
  supply = 0;
  supplyLong = '0';
  burntValue!: string;
  decimals = 0;
  isPaused = false;
  canUpgrade = false;
  canMint = false;
  canBurn = false;
  canChangeOwner = false;
  canPause = false;
  canFreeze = false;
  canWipe = false;
  canAddSpecialRoles = false;
  canTransferNFTCreateRole = false;
  nftCreateStopped = false;
  wipedQuantity = 0;
  canCreateMultiShard = false;

  constructor(props?: Partial<EsdtTokenProperties>) {
    Object.assign(this, props);
  }
}
