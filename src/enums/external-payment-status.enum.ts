export enum ExternalPaymentInternalStatus {
  GeneratePaymentForm = 'generatePaymentForm',
  PaymentProviderCallback = 'paymentProviderCallback',
  ExternalPaymentQueued = 'externalPaymentQueued',
  InitiatedBlockchainTx = 'initiatedBlockchainTx',
  ExternalPaymentComplete = 'externalPaymentComplete',
  ExternalPaymentRefund = 'externalPaymentRefund',
}

export enum ItemType {
  physical = 'physical',
  digital = 'digital',
}
