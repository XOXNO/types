import { PositionMode } from '../../../enums/lending.enum';

export class LendingNftAttributes {
  isolated!: boolean;
  eModeCategory!: string;
  isVault!: boolean;
  positionMode!: PositionMode;
  isolatedToken?: string;

  constructor(props?: Partial<LendingNftAttributes>) {
    Object.assign(this, props);
  }
}
