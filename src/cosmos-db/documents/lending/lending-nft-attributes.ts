export enum PositionMode {
  None = 'None',
  Normal = 'Normal',
  Multiply = 'Multiply',
  Long = 'Long',
  Short = 'Short',
}

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

export type LendingNftAttributesType = LendingNftAttributes;
