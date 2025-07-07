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

export enum TwispayTransactionType {
  purchase = 'purchase',
  recurring = 'recurring',
  managed = 'managed',
  credit = 'credit',
}

export enum TwispayCardTransactionMode {
  auth = 'auth', //only reserve the requested amount
  authAndCapture = 'authAndCapture', //also sends a settlement request
  credit = 'credit',
}

export enum TwispayIntervalType {
  day = 'day',
  month = 'month',
}

export enum TwispayTransactionStatus {
  completeOk = 'complete-ok', //complete, successful transaction
  cancelOk = 'cancel-ok',
  refundOk = 'refund-ok',
  voidOk = 'void-ok', //using refund on AUTH only transaction
  chargeBack = 'charge-back',
  completeFailed = 'complete-failed', //declined transaction, can be declined if there is a long period of time passed. usually capture has to be made within 7days
  inProgress = 'in-progress', //only the AUTH was made and it was successfully authorized - could be first status
  pending3d = '3d-pending', //waiting 3d from client, can get stuck here if the customer doesn't complete the 3d pending challenge - possible the first status if the customers goes through 3d 90% will be 3d-pending, twispay doesn't send us this status.
}

export enum TwispayTransactionRefundReason {
  fraudConfirm = 'fraud-confirm',
  highlySuspicious = 'highly-suspicious',
  duplicatedTransaction = 'duplicated-transaction',
  customerDemand = 'customer-demand',
  testTransaction = 'test-transaction',
  completeFailed = 'complete-failed',
  cardExpired = 'card-expired',
  itemSoltOut = 'The item is sold already',
}
