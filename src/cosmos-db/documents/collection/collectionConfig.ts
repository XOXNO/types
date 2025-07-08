export class XoxnoMarketplaceScCollectionConfig {
  reversedCutFees: boolean = false;
  reversedRoyalties: boolean = false;
  customRoyalties: boolean = false;
  minRoyalties: number = 0;
  maxRoyalties: number = 0;
  extraFees?: CollectionExtraFeesConfig;
  adminAddress?: string;

  constructor(init?: Partial<CollectionExtraFeesConfig>) {
    Object.assign(this, init);
    this.maxRoyalties = parseInt(this.maxRoyalties.toString()) / 100;
    this.minRoyalties = parseInt(this.minRoyalties.toString()) / 100;
    if (this.extraFees) {
      this.extraFees.amount = parseInt(this.extraFees.amount.toString()) / 100;
    }
  }
}

export interface CollectionExtraFeesConfig {
  amount: number;
  address: string;
}
