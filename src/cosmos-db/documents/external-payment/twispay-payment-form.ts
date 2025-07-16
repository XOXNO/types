import { TwispayTransactionStatus } from '../../../enums/twispay.enum';
import { ExternalPaymentRequest } from './external-payment-request';

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
