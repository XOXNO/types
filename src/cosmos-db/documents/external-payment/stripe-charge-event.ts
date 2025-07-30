import { ApiProperty } from '@nestjs/swagger';
import { ExternalPaymentRequest } from './external-payment-request';

export class Address {
  @ApiProperty({
    description: 'City name',
    nullable: true,
    example: null,
  })
  city!: null;

  @ApiProperty({
    description: 'Country code',
    example: 'US',
  })
  country!: string;

  @ApiProperty({
    description: 'Address line 1',
    nullable: true,
    example: null,
  })
  line1!: null;

  @ApiProperty({
    description: 'Address line 2',
    nullable: true,
    example: null,
  })
  line2!: null;

  @ApiProperty({
    description: 'Postal code',
    nullable: true,
    example: null,
  })
  postal_code!: null;

  @ApiProperty({
    description: 'State or province',
    nullable: true,
    example: null,
  })
  state!: null;
}

export class BillingDetails {
  @ApiProperty({
    description: 'Billing address details',
    type: () => Address,
  })
  address!: Address;

  @ApiProperty({
    description: 'Email address for billing',
    example: 'customer@example.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Customer name',
    example: 'John Doe',
  })
  name!: string;

  @ApiProperty({
    description: 'Phone number',
    nullable: true,
    example: null,
  })
  phone!: null;
}

export class FraudDetails {
  @ApiProperty({
    description: 'Test fraud detection result',
    example: 'pass',
  })
  test!: string;
}

export class Outcome {
  @ApiProperty({
    description: 'Network status of the transaction',
    example: 'approved_by_network',
  })
  network_status!: string;

  @ApiProperty({
    description: 'Reason for outcome',
    nullable: true,
    example: null,
  })
  reason!: null;

  @ApiProperty({
    description: 'Risk level assessment',
    example: 'normal',
  })
  risk_level!: string;

  @ApiProperty({
    description: 'Risk score',
    type: 'number',
    example: 32,
  })
  risk_score!: number;

  @ApiProperty({
    description: 'Message for the seller',
    example: 'Payment complete.',
  })
  seller_message!: string;

  @ApiProperty({
    description: 'Type of outcome',
    example: 'authorized',
  })
  type!: string;
}

export class Checks {
  @ApiProperty({
    description: 'Address line 1 verification check',
    nullable: true,
    example: null,
  })
  address_line1_check!: null;

  @ApiProperty({
    description: 'Address postal code verification check',
    nullable: true,
    example: null,
  })
  address_postal_code_check!: null;

  @ApiProperty({
    description: 'CVC verification check result',
    example: 'pass',
  })
  cvc_check!: string;
}

export class ExtendedAuthorization {
  @ApiProperty({
    description: 'Status of extended authorization',
    example: 'disabled',
  })
  status!: string;
}

export class NetworkToken {
  @ApiProperty({
    description: 'Whether network token was used',
    type: 'boolean',
    example: false,
  })
  used!: boolean;
}

export class Overcapture {
  @ApiProperty({
    description: 'Maximum amount that can be captured',
    type: 'number',
    example: 10000,
  })
  maximum_amount_capturable!: number;

  @ApiProperty({
    description: 'Overcapture status',
    example: 'unavailable',
  })
  status!: string;
}

export class Card {
  @ApiProperty({
    description: 'Amount authorized on the card',
    type: 'number',
    example: 10000,
  })
  amount_authorized!: number;

  @ApiProperty({
    description: 'Card brand',
    example: 'visa',
  })
  brand!: string;

  @ApiProperty({
    description: 'Unix timestamp before which capture must happen',
    type: 'number',
    example: 1673136000,
  })
  capture_before!: number;

  @ApiProperty({
    description: 'Card verification checks',
    type: () => Checks,
  })
  checks!: Checks;

  @ApiProperty({
    description: 'Card country of issue',
    example: 'US',
  })
  country!: string;

  @ApiProperty({
    description: 'Card expiration month',
    type: 'number',
    example: 12,
  })
  exp_month!: number;

  @ApiProperty({
    description: 'Card expiration year',
    type: 'number',
    example: 2025,
  })
  exp_year!: number;

  @ApiProperty({
    description: 'Extended authorization details',
    type: () => ExtendedAuthorization,
  })
  extended_authorization!: ExtendedAuthorization;

  @ApiProperty({
    description: 'Card fingerprint',
    example: 'Qw7kJEAT12ABC123',
  })
  fingerprint!: string;

  @ApiProperty({
    description: 'Card funding type',
    example: 'credit',
  })
  funding!: string;

  @ApiProperty({
    description: 'Incremental authorization details',
    type: () => ExtendedAuthorization,
  })
  incremental_authorization!: ExtendedAuthorization;

  @ApiProperty({
    description: 'Installment details',
    nullable: true,
    example: null,
  })
  installments!: null;

  @ApiProperty({
    description: 'Last 4 digits of the card',
    example: '4242',
  })
  last4!: string;

  @ApiProperty({
    description: 'Mandate details',
    nullable: true,
    example: null,
  })
  mandate!: null;

  @ApiProperty({
    description: 'Multicapture details',
    type: () => ExtendedAuthorization,
  })
  multicapture!: ExtendedAuthorization;

  @ApiProperty({
    description: 'Card network',
    example: 'visa',
  })
  network!: string;

  @ApiProperty({
    description: 'Network token details',
    type: () => NetworkToken,
  })
  network_token!: NetworkToken;

  @ApiProperty({
    description: 'Overcapture details',
    type: () => Overcapture,
  })
  overcapture!: Overcapture;

  @ApiProperty({
    description: '3D Secure details',
    nullable: true,
    example: null,
  })
  three_d_secure!: null;

  @ApiProperty({
    description: 'Digital wallet details',
    nullable: true,
    example: null,
  })
  wallet!: null;
}

export class PaymentMethodDetails {
  @ApiProperty({
    description: 'Card payment details',
    type: () => Card,
  })
  card!: Card;

  @ApiProperty({
    description: 'Payment method type',
    example: 'card',
  })
  type!: string;
}

export class TransferData {
  @ApiProperty({
    description: 'Transfer amount',
    nullable: true,
    example: null,
  })
  amount!: null;

  @ApiProperty({
    description: 'Transfer destination account',
    example: 'acct_1234567890',
  })
  destination!: string;
}

export class ChargeEventBody {
  @ApiProperty({
    description: 'Callback data with external payment request and order ID',
    allOf: [
      { $ref: '#/components/schemas/ExternalPaymentRequest' },
      {
        type: 'object',
        properties: {
          externalOrderId: { type: 'string' },
        },
      },
    ],
  })
  callbackData!: ExternalPaymentRequest & {
    externalOrderId: string;
  };

  @ApiProperty({
    description: 'Stripe charge ID',
    example: 'ch_1234567890',
  })
  id!: string;

  @ApiProperty({
    description: 'Object type',
    example: 'charge',
  })
  object!: string;

  @ApiProperty({
    description: 'Whether this is a live mode charge',
    type: 'boolean',
    example: true,
  })
  livemode!: boolean;

  @ApiProperty({
    description: 'Payment intent ID',
    example: 'pi_1234567890',
  })
  payment_intent!: string;

  @ApiProperty({
    description: 'Charge status',
    example: 'succeeded',
  })
  status!: string;

  @ApiProperty({
    description: 'Charge amount in cents',
    type: 'number',
    example: 10000,
  })
  amount!: number;

  @ApiProperty({
    description: 'Amount captured in cents',
    type: 'number',
    example: 10000,
  })
  amount_captured!: number;

  @ApiProperty({
    description: 'Amount refunded in cents',
    type: 'number',
    example: 0,
  })
  amount_refunded!: number;

  @ApiProperty({
    description: 'Application ID',
    nullable: true,
    example: null,
  })
  application!: null;

  @ApiProperty({
    description: 'Application fee ID',
    nullable: true,
    example: null,
  })
  application_fee!: null;

  @ApiProperty({
    description: 'Application fee amount',
    type: 'number',
    example: 0,
  })
  application_fee_amount!: number;

  @ApiProperty({
    description: 'Balance transaction ID',
    nullable: true,
    example: null,
  })
  balance_transaction!: null;

  @ApiProperty({
    description: 'Billing details',
    type: () => BillingDetails,
  })
  billing_details!: BillingDetails;

  @ApiProperty({
    description: 'Calculated statement descriptor',
    example: 'XOXNO MARKETPLACE',
  })
  calculated_statement_descriptor!: string;

  @ApiProperty({
    description: 'Whether the charge was captured',
    type: 'boolean',
    example: true,
  })
  captured!: boolean;

  @ApiProperty({
    description: 'Unix timestamp when charge was created',
    type: 'number',
    example: 1672531200,
  })
  created!: number;

  @ApiProperty({
    description: 'Currency code',
    example: 'usd',
  })
  currency!: string;

  @ApiProperty({
    description: 'Customer ID',
    nullable: true,
    example: null,
  })
  customer!: null;

  @ApiProperty({
    description: 'Charge description',
    example: 'NFT Purchase',
  })
  description!: string;

  @ApiProperty({
    description: 'Destination account for direct charges',
    example: 'acct_1234567890',
  })
  destination!: string;

  @ApiProperty({
    description: 'Dispute ID',
    nullable: true,
    example: null,
  })
  dispute!: null;

  @ApiProperty({
    description: 'Whether the charge is disputed',
    type: 'boolean',
    example: false,
  })
  disputed!: boolean;

  @ApiProperty({
    description: 'Failure balance transaction',
    nullable: true,
    example: null,
  })
  failure_balance_transaction!: null;

  @ApiProperty({
    description: 'Failure code',
    nullable: true,
    example: null,
  })
  failure_code!: null;

  @ApiProperty({
    description: 'Failure message',
    nullable: true,
    example: null,
  })
  failure_message!: null;

  @ApiProperty({
    description: 'Fraud details',
    type: () => FraudDetails,
  })
  fraud_details!: FraudDetails;

  @ApiProperty({
    description: 'Invoice ID',
    nullable: true,
    example: null,
  })
  invoice!: null;

  @ApiProperty({
    description: 'Charge metadata',
    example: {
      externalOrderId: 'ORDER_123456',
      payload: '{"custom": "data"}',
    },
    properties: {
      externalOrderId: { type: 'string' },
      payload: { type: 'string' },
    },
  })
  metadata!: {
    externalOrderId: string;
    payload: string;
  };

  @ApiProperty({
    description: 'On behalf of account',
    nullable: true,
    example: null,
  })
  on_behalf_of!: null;

  @ApiProperty({
    description: 'Order ID',
    nullable: true,
    example: null,
  })
  order!: null;

  @ApiProperty({
    description: 'Charge outcome details',
    type: () => Outcome,
  })
  outcome!: Outcome;

  @ApiProperty({
    description: 'Whether the charge was paid',
    type: 'boolean',
    example: true,
  })
  paid!: boolean;

  @ApiProperty({
    description: 'Payment method ID',
    example: 'pm_1234567890',
  })
  payment_method!: string;

  @ApiProperty({
    description: 'Payment method details',
    type: () => PaymentMethodDetails,
  })
  payment_method_details!: PaymentMethodDetails;

  @ApiProperty({
    description: 'Radar options',
    type: () => FraudDetails,
  })
  radar_options!: FraudDetails;

  @ApiProperty({
    description: 'Receipt email address',
    example: 'customer@example.com',
  })
  receipt_email!: string;

  @ApiProperty({
    description: 'Receipt number',
    nullable: true,
    example: null,
  })
  receipt_number!: null;

  @ApiProperty({
    description: 'Receipt URL',
    example: 'https://pay.stripe.com/receipts/...',
  })
  receipt_url!: string;

  @ApiProperty({
    description: 'Whether the charge was refunded',
    type: 'boolean',
    example: false,
  })
  refunded!: boolean;

  @ApiProperty({
    description: 'Review ID',
    nullable: true,
    example: null,
  })
  review!: null;

  @ApiProperty({
    description: 'Shipping details',
    nullable: true,
    example: null,
  })
  shipping!: null;

  @ApiProperty({
    description: 'Source ID',
    nullable: true,
    example: null,
  })
  source!: null;

  @ApiProperty({
    description: 'Source transfer ID',
    nullable: true,
    example: null,
  })
  source_transfer!: null;

  @ApiProperty({
    description: 'Statement descriptor',
    nullable: true,
    example: null,
  })
  statement_descriptor!: null;

  @ApiProperty({
    description: 'Statement descriptor suffix',
    nullable: true,
    example: null,
  })
  statement_descriptor_suffix!: null;

  @ApiProperty({
    description: 'Transfer data',
    type: () => TransferData,
  })
  transfer_data!: TransferData;

  @ApiProperty({
    description: 'Transfer group',
    example: 'group_123456',
  })
  transfer_group!: string;
}
