import {
  TwispayTransactionType,
  TwispayIntervalType,
} from '../../../enums/twispay.enum';
import { TwispayCartItems } from './twispay-cart';

//https://twispay.github.io/
export interface TwispayOrderDetails {
  amount: number; //use dot as decimal separator
  currency: string; //use ISO 4217 three letter code
  description?: string; //77056 characters long; mandatory if item is not defined
  type: TwispayTransactionType;
  orderId: string; //your identifier of the transaction; must be unique for each request
  retryPayment?: string; // Comma separated values representing retry intervals for failed re-bill payments, use ISO 8601 Durations [ex: P1D,P2D,P3D]
  tags?: string[];
  intervalType?: TwispayIntervalType; //recurring interval value; Eg. Set “intervalValue” = 1 and “intervalType” = month; for a monthly subscription plan
  intervalValue?: number;
  trialAmount?: number; //use dot as decimal separator; cannot be 0 (zero)
  firstBillDate?: string; //use ISO 8601 date, time and timezone offset; declare the date of the first recurring payment
  items?: TwispayCartItems[];
}

// cardTransactionMode: TwispayCardTransactionMode;
//   backUrl: string; // used to redirect the customers back to the merchant’s site; we also post an encrypted transaction result to this URL
//   cardId?: number; //id of a previously used card for this customer
//   invoiceEmail?: string; //an alternative email address to send invoice to
//   custom?: string[]; //associative array of string values
