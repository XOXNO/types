import { LendingDataType } from './lending-data-type.enum';

export class LendingEModeCategoryProfileDoc {
  dataType = LendingDataType.EMODE_CATEGORY_PROFILE;
  id!: string;
  ltv!: string;
  liquidationThreshold!: string;
  liquidationBonus!: string;
  isDeprecated!: boolean;
  pk!: string;

  constructor(init?: Partial<LendingEModeCategoryProfileDoc>) {
    Object.assign(this, init);
    this.pk = this.dataType;
  }
}
