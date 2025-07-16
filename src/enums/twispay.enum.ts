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
