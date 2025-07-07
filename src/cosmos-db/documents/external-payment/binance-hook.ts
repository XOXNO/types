interface PaymentInstruction {
  currency: string;
  amount: number; // decimal mapped to number in TypeScript
  price: number; // decimal mapped to number in TypeScript
}

interface PaymentInfo {
  payerId: number; // long mapped to number in TypeScript
  payMethod: string;
  paymentInstructions: PaymentInstruction[];
  channel?: string; // Optional as it's not required
  subChannel?: string; // Optional as it's not required
}

export interface BinanceNotificationData {
  merchantTradeNo: string;
  productType: string;
  productName: string;
  transactTime: number; // long mapped to number in TypeScript
  tradeType: string;
  totalFee: number; // decimal mapped to number in TypeScript
  currency: string;
  transactionId?: string; // Optional as it's not required
  openUserId?: string; // Optional as it's not required
  passThroughInfo?: string; // Optional as it's not required
  commission: number; // decimal mapped to number in TypeScript
  paymentInfo?: PaymentInfo; // Optional as it's not required
}

export interface BinanceRequestParameters {
  bizType: BinanceBizType;
  bizId: number; // long mapped to number in TypeScript
  bizIdStr: string;
  bizStatus: BinanceBizStatus;
  data: string; // Assuming this is a JSON string representation of NotificationData
  childAttribute?: BinanceNotificationData; // Assuming child attribute holds NotificationData, and is optional
}

export enum BinanceBizType {
  PAY = 'PAY',
  REFUND = 'REFUND',
  PAYOUT = 'PAYOUT',
  PAY_REFUND = 'PAY_REFUND',
  BALANCE = 'BALANCE',
}

export enum BinanceBizStatus {
  PAY_SUCCESS = 'PAY_SUCCESS',
  PAY_CLOSED = 'PAY_CLOSED',
}
