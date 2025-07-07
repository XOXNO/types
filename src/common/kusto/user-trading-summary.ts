export class UserTradingSummary {
  count!: number;
  volume!: number;
  min!: {
    price: number;
    txHash: string;
    timestamp: number;
    identifier: string;
  };
  max!: {
    price: number;
    txHash: string;
    timestamp: number;
    identifier: string;
  };
  avg!: {
    price: number;
  };
}

export type TradingSummaryActivityType = 'Purchase' | 'Sale';
