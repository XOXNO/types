import { PositionMode } from '../../../enums/lending.enum';

export class LendingNftAttributes {
  isolated!: boolean;
  eModeCategory!: string;
  isVault!: boolean;
  positionMode!: PositionMode;
  isolatedToken?: string;

  constructor(init?: Partial<LendingNftAttributes>) {
    Object.assign(this, init);
  }
}
