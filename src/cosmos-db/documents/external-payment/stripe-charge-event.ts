import { ExternalPaymentRequest } from './external-payment-request';

export interface ChargeEventBody {
  callbackData: ExternalPaymentRequest & {
    externalOrderId: string;
  };
  id: string;
  object: string;
  livemode: boolean;
  payment_intent: string;
  status: string;
  amount: number;
  amount_captured: number;
  amount_refunded: number;
  application: null;
  application_fee: null;
  application_fee_amount: number;
  balance_transaction: null;
  billing_details: BillingDetails;
  calculated_statement_descriptor: string;
  captured: boolean;
  created: number;
  currency: string;
  customer: null;
  description: string;
  destination: string;
  dispute: null;
  disputed: boolean;
  failure_balance_transaction: null;
  failure_code: null;
  failure_message: null;
  fraud_details: FraudDetails;
  invoice: null;
  metadata: {
    externalOrderId: string;
    payload: string;
  };
  on_behalf_of: null;
  order: null;
  outcome: Outcome;
  paid: boolean;
  payment_method: string;
  payment_method_details: PaymentMethodDetails;
  radar_options: FraudDetails;
  receipt_email: string;
  receipt_number: null;
  receipt_url: string;
  refunded: boolean;
  review: null;
  shipping: null;
  source: null;
  source_transfer: null;
  statement_descriptor: null;
  statement_descriptor_suffix: null;
  transfer_data: TransferData;
  transfer_group: string;
}

export interface BillingDetails {
  address: Address;
  email: string;
  name: string;
  phone: null;
}

export interface Address {
  city: null;
  country: string;
  line1: null;
  line2: null;
  postal_code: null;
  state: null;
}

export interface FraudDetails {
  test: string;
}

export interface Outcome {
  network_status: string;
  reason: null;
  risk_level: string;
  risk_score: number;
  seller_message: string;
  type: string;
}

export interface PaymentMethodDetails {
  card: Card;
  type: string;
}

export interface Card {
  amount_authorized: number;
  brand: string;
  capture_before: number;
  checks: Checks;
  country: string;
  exp_month: number;
  exp_year: number;
  extended_authorization: ExtendedAuthorization;
  fingerprint: string;
  funding: string;
  incremental_authorization: ExtendedAuthorization;
  installments: null;
  last4: string;
  mandate: null;
  multicapture: ExtendedAuthorization;
  network: string;
  network_token: NetworkToken;
  overcapture: Overcapture;
  three_d_secure: null;
  wallet: null;
}

export interface Checks {
  address_line1_check: null;
  address_postal_code_check: null;
  cvc_check: string;
}

export interface ExtendedAuthorization {
  status: string;
}

export interface NetworkToken {
  used: boolean;
}

export interface Overcapture {
  maximum_amount_capturable: number;
  status: string;
}

export interface TransferData {
  amount: null;
  destination: string;
}
