/**
 * Order type enum for xMoney orders
 */
export enum XMoneyOrderType {
  /** One-off payment */
  Purchase = 'purchase',
  /** Recurring order billed automatically based on interval */
  Recurring = 'recurring',
  /** Merchant-managed order; rebilling initiated by merchant */
  Managed = 'managed',
  /** Credit transactions (OCTs/CFTs) */
  Credit = 'credit',
}

/**
 * Interval type for recurring orders
 */
export enum XMoneyIntervalType {
  Day = 'day',
  Month = 'month',
}

/**
 * Transaction method for payment
 */
export enum XMoneyTransactionMethod {
  Card = 'card',
  Wallet = 'wallet',
}

/**
 * Card transaction mode
 */
export enum XMoneyCardTransactionMode {
  /** Authorizes card without capturing funds */
  Auth = 'auth',
  /** Authorizes and immediately captures funds */
  AuthAndCapture = 'authAndCapture',
  /** Credit transaction (refund/reversal) */
  Credit = 'credit',
}

/**
 * Digital wallet type
 */
export enum XMoneyWalletType {
  GooglePay = 'googlePay',
  ApplePay = 'applePay',
}

/**
 * Soft decline option
 */
export enum XMoneySoftDecline {
  Yes = 'yes',
  No = 'no',
}

/**
 * 3D Secure redirect form method
 */
export enum XMoneyRedirectFormMethod {
  POST = 'POST',
  GET = 'GET',
}

/**
 * Error type enum
 */
export enum XMoneyErrorType {
  Exception = 'Exception',
  Validation = 'Validation',
}
