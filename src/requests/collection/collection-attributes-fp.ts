interface ValueFp {
  floorPrice: number;
  onSaleCount: number;
  usdValue?: number;
}

export type TraitTypeFp = ValueFp & {
  [value: string]: ValueFp;
};

export interface CollectionAttributesFp {
  [trait_type: string]: TraitTypeFp;
}
