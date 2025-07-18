export class TokenDataDoc {
  id!: string;
  identifier!: string;
  collection!: string;
  dataType!: string;
  decimals!: number;
  name!: string;
  type!: string;
  category: string[] = ['userInventory'];
  svgUrl!: string;
  pngUrl!: string;
  ticker!: string;
  _ts!: number;

  constructor(props?: Partial<TokenDataDoc>) {
    Object.assign(this, props);
  }
}

export class TokenDataDocHydrated extends TokenDataDoc {
  isAshSupported!: boolean;
  usdPrice!: number;
}
