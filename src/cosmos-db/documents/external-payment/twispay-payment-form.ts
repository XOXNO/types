import { ExternalPaymentRequest } from './external-payment-request';
import { TwispayTransactionStatus } from './twispay-transaction';

export interface TwispayCallBackData {
  transactionStatus: TwispayTransactionStatus;
  orderId: string;
  transactionId: number | string;
  externalOrderId: string;
  amount: number;
  identifier: string;
  currency: string;
  timestamp: number;
  customerId: string;
  customData: ExternalPaymentRequest;
  errors?: unknown[];
}
