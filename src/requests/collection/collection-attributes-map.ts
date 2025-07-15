export class TraitInfo {
  floorPrice?: number;
  onSaleCount?: number;
  usdValue?: number;
  attributeOccurrence!: number;
  attributeFrequency!: number;
  attributeRarity!: number;
  traitOccurance!: number;
  traitFrequency!: number;
  traitOccurancePercentage!: number;
  attributeRarityNormed!: number;
}

export class ValueFp {
  floorPrice?: number;
  onSaleCount?: number;
  usdValue?: number;
}

export type TraitCategory = ValueFp & {
  [value: string]: TraitInfo;
};

export interface CollectionTraitMap {
  [traitCategory: string]: TraitCategory;
}
