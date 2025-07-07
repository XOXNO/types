import { LendingDataType } from './lending-data-type.enum';

export class LendingTokenEModeProfileDoc {
  dataType = LendingDataType.TOKEN_EMODE_PROFILE;
  token!: string;
  canBeCollateral!: boolean;
  canBeBorrowed!: boolean;
  eModeCategory!: string;
  id!: string;
  pk!: string;

  constructor(init?: Partial<LendingTokenEModeProfileDoc>) {
    Object.assign(this, init);
    this.pk = this.dataType;
    this.id = `${this.token}_${this.eModeCategory}_${this.dataType}`;
  }
}

export type LendingTokenEModeProfileDocType = LendingTokenEModeProfileDoc;
