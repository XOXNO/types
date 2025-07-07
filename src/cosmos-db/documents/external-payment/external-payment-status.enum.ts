/**
 * Internal status of the external payment process.
 *
 * @enum {string} GeneratePaymentForm - Initial stage when UI calls the endpoint to generate the payment form
 * @enum {string} PaymentProviderCallback - Payment provider called our endpoint after user completed the payment activity
 * @enum {string} ExternalPaymentQueued - Queued order was processed to be executed on blockchain
 * @enum {string} InitiatedBlockchainTx - Transaction was initiated on blockchain
 * @enum {string} ExternalPaymentComplete - Transaction was completed on blockchain & money was received
 * @enum {string} ExternalPaymentRefund - Transaction failed on blockchain & money was refunded
 */
export enum ExternalPaymentInternalStatus {
  GeneratePaymentForm = 'generatePaymentForm',
  PaymentProviderCallback = 'paymentProviderCallback',
  ExternalPaymentQueued = 'externalPaymentQueued',
  InitiatedBlockchainTx = 'initiatedBlockchainTx',
  ExternalPaymentComplete = 'externalPaymentComplete',
  ExternalPaymentRefund = 'externalPaymentRefund',
}
