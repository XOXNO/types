import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import {
  XMoneyCardTransactionMode,
  XMoneyErrorType,
  XMoneyIntervalType,
  XMoneyOrderType,
  XMoneyRedirectFormMethod,
  XMoneySoftDecline,
  XMoneyTransactionMethod,
  XMoneyWalletType,
} from '../../../enums/xmoney.enum';

// Re-export enums for convenience
export {
  XMoneyCardTransactionMode,
  XMoneyErrorType,
  XMoneyIntervalType,
  XMoneyOrderType,
  XMoneyRedirectFormMethod,
  XMoneySoftDecline,
  XMoneyTransactionMethod,
  XMoneyWalletType,
};

// xMoney Order API Types based on xMoney API documentation
// https://docs.xmoney.com/
// Note: xMoney API expects application/x-www-form-urlencoded content type

/**
 * Digital wallet configuration for transaction options
 */
export class XMoneyDigitalWallet {
  @ApiProperty({
    description: 'Type of digital wallet',
    enum: XMoneyWalletType,
    enumName: 'XMoneyWalletType',
  })
  walletType!: XMoneyWalletType;

  @ApiProperty({
    description: 'Wallet payment data',
  })
  data!: string;
}

/**
 * Split payment schema item
 */
export class XMoneySplitPaymentSchemaItem {
  @ApiProperty({
    description: 'Destination site ID for the split amount',
  })
  toSite!: number;

  @ApiProperty({
    description: 'Amount to split to this site',
    type: 'number',
  })
  amount!: number;

  @ApiPropertyOptional({
    description: 'Description for this split',
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Tags for this split',
    type: [String],
    isArray: true,
    required: false,
  })
  @IsOptional()
  tag?: string[];
}

/**
 * Split payment configuration
 */
export class XMoneySplitPayment {
  @ApiProperty({
    description: 'Array of split payment schemas',
    type: [XMoneySplitPaymentSchemaItem],
    isArray: true,
  })
  splitSchema!: XMoneySplitPaymentSchemaItem[];
}

/**
 * Transaction options for xMoney order
 */
export class XMoneyTransactionOption {
  @ApiPropertyOptional({
    description: 'Digital wallet configuration',
    type: () => XMoneyDigitalWallet,
    required: false,
  })
  @IsOptional()
  digitalWallet?: XMoneyDigitalWallet;

  @ApiPropertyOptional({
    description: 'Soft decline handling',
    enum: XMoneySoftDecline,
    enumName: 'XMoneySoftDecline',
    required: false,
  })
  @IsOptional()
  isSoftDecline?: XMoneySoftDecline;

  @ApiPropertyOptional({
    description: 'Sub-merchant ID for payment facilitators',
    required: false,
  })
  @IsOptional()
  subMerchantId?: string;

  @ApiPropertyOptional({
    description: 'Split payment configuration',
    type: () => XMoneySplitPayment,
    required: false,
  })
  @IsOptional()
  splitPayment?: XMoneySplitPayment;
}

/**
 * xMoney Order Request - for creating orders
 * Note: xMoney API expects application/x-www-form-urlencoded content type
 */
export class XMoneyOrderRequest {
  // Required fields
  @ApiProperty({
    description:
      'Monetary amount in the given currency (e.g., 100.00 for €100.00)',
    type: 'number',
    example: 100.0,
  })
  amount!: number;

  @ApiProperty({
    description: 'ISO 4217 three-character currency code',
    example: 'EUR',
    minLength: 3,
    maxLength: 3,
  })
  currency!: string;

  @ApiProperty({
    description: 'Type of the order',
    enum: XMoneyOrderType,
    enumName: 'XMoneyOrderType',
  })
  orderType!: XMoneyOrderType;

  @ApiProperty({
    description: 'Unique identifier for the customer',
    type: 'number',
  })
  customerId!: number;

  // Optional fields
  @ApiPropertyOptional({
    description:
      'Unique identifier of your site profile (mandatory if more than one site is configured)',
    type: 'number',
    required: false,
  })
  @IsOptional()
  siteId?: number;

  @ApiPropertyOptional({
    description: 'Description of the goods or services included in the order',
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description:
      'External order identifier to link the order with an external system',
    required: false,
  })
  @IsOptional()
  externalOrderId?: string;

  @ApiPropertyOptional({
    description: 'Type of recurring interval (required for recurring orders)',
    enum: XMoneyIntervalType,
    enumName: 'XMoneyIntervalType',
    required: false,
  })
  @IsOptional()
  intervalType?: XMoneyIntervalType;

  @ApiPropertyOptional({
    description:
      'Value of recurring interval (e.g., 3 with month = every 3 months)',
    type: 'number',
    required: false,
  })
  @IsOptional()
  intervalValue?: number;

  @ApiPropertyOptional({
    description:
      'Comma-separated ISO 8601 Durations for retry intervals (e.g., PT1H,PT2H)',
    example: 'PT1H,PT2H',
    required: false,
  })
  @IsOptional()
  retryPayment?: string;

  @ApiPropertyOptional({
    description: 'Amount to charge for initial (trial) payment',
    type: 'number',
    required: false,
  })
  @IsOptional()
  trialAmount?: number;

  @ApiPropertyOptional({
    description:
      'Initial billing date when different from regular interval (ISO 8601 format)',
    example: '2024-02-01T10:00:00Z',
    required: false,
  })
  @IsOptional()
  firstBillDate?: string;

  @ApiPropertyOptional({
    description:
      'URL to redirect cardholder after 3D Secure or digital wallet payment',
    example: 'https://myserver.com/callback/success-payment',
    required: false,
  })
  @IsOptional()
  backUrl?: string;

  @ApiPropertyOptional({
    description: 'Payment method for the transaction',
    enum: XMoneyTransactionMethod,
    enumName: 'XMoneyTransactionMethod',
    required: false,
  })
  @IsOptional()
  transactionMethod?: XMoneyTransactionMethod;

  @ApiPropertyOptional({
    description: 'How the card transaction is processed',
    enum: XMoneyCardTransactionMode,
    enumName: 'XMoneyCardTransactionMode',
    required: false,
  })
  @IsOptional()
  cardTransactionMode?: XMoneyCardTransactionMode;

  @ApiPropertyOptional({
    description: 'ID of a stored card belonging to the current customer',
    type: 'number',
    example: 123,
    required: false,
  })
  @IsOptional()
  cardId?: number;

  @ApiPropertyOptional({
    description: 'Card number (numbers only, no spaces)',
    required: false,
  })
  @IsOptional()
  cardNumber?: string;

  @ApiPropertyOptional({
    description: 'Card expiry date (MM/YY)',
    example: '12/28',
    required: false,
  })
  @IsOptional()
  cardExpiryDate?: string;

  @ApiPropertyOptional({
    description: 'Card verification value (3 digits for Visa/MC, 4 for Amex)',
    required: false,
  })
  @IsOptional()
  cardCvv?: string;

  @ApiPropertyOptional({
    description: "Cardholder's name",
    required: false,
  })
  @IsOptional()
  cardHolderName?: string;

  @ApiPropertyOptional({
    description: "Cardholder's country (ISO 3166-1 alpha-2)",
    example: 'US',
    minLength: 2,
    maxLength: 2,
    required: false,
  })
  @IsOptional()
  cardHolderCountry?: string;

  @ApiPropertyOptional({
    description:
      "Cardholder's state (for US and CA only, ISO 3166-2 two-letter code)",
    example: 'NY',
    minLength: 2,
    maxLength: 2,
    required: false,
  })
  @IsOptional()
  cardHolderState?: string;

  @ApiPropertyOptional({
    description: 'Whether to save the card information for future use',
    type: 'boolean',
    required: false,
  })
  @IsOptional()
  saveCard?: boolean;

  @ApiPropertyOptional({
    description: 'Email address to send the invoice to',
    format: 'email',
    required: false,
  })
  @IsOptional()
  invoiceEmail?: string;

  @ApiPropertyOptional({
    description: "Customer's IP address (IPv4 or IPv6)",
    required: false,
  })
  @IsOptional()
  ip?: string;

  @ApiPropertyOptional({
    description:
      'Base64 encoded JSON object containing 3D Secure version 2 data',
    required: false,
  })
  @IsOptional()
  threeDSecureData?: string;

  @ApiPropertyOptional({
    description:
      'Custom data passed back in IPN callback (can be JSON-encoded string)',
    required: false,
  })
  @IsOptional()
  externalCustomData?: string;

  @ApiPropertyOptional({
    description: 'Detailed information about items/tickets in JSON format',
    required: false,
  })
  @IsOptional()
  level3Data?: string;

  @ApiPropertyOptional({
    description: 'Optional transaction flags and configurations',
    type: () => XMoneyTransactionOption,
    required: false,
  })
  @IsOptional()
  transactionOption?: XMoneyTransactionOption;
}

/**
 * Redirect data for 3D Secure payments
 */
export class XMoneyRedirectData {
  @ApiProperty({
    description: 'URL of the ACS (Access Control Server)',
  })
  url!: string;

  @ApiProperty({
    description:
      'Key-value pairs of parameters to send to the ACS URL using formMethod',
    type: 'object',
    additionalProperties: { type: 'string' },
  })
  params!: Record<string, string>;

  @ApiPropertyOptional({
    description: 'HTTP method to use when redirecting',
    enum: XMoneyRedirectFormMethod,
    enumName: 'XMoneyRedirectFormMethod',
    required: false,
  })
  @IsOptional()
  formMethod?: XMoneyRedirectFormMethod;
}

/**
 * Successful order response data (201)
 */
export class XMoneyOrderResponseData {
  @ApiProperty({
    description: 'Order ID from xMoney',
    type: 'number',
  })
  orderId!: number;

  @ApiProperty({
    description: 'Transaction ID from xMoney',
    type: 'number',
  })
  transactionId!: number;

  @ApiPropertyOptional({
    description: 'Card ID if the card was saved',
    type: 'number',
    required: false,
  })
  @IsOptional()
  cardId?: number;

  @ApiPropertyOptional({
    description: 'Whether 3D Secure is required (0 or 1)',
    enum: [0, 1],
    required: false,
  })
  @IsOptional()
  is3d?: 0 | 1;

  @ApiPropertyOptional({
    description: 'Whether a redirect is required',
    type: 'boolean',
    required: false,
  })
  @IsOptional()
  isRedirect?: boolean;

  @ApiPropertyOptional({
    description: 'Redirect data (available only if is3d = 1)',
    type: () => XMoneyRedirectData,
    required: false,
  })
  @IsOptional()
  redirect?: XMoneyRedirectData;
}

/**
 * Successful order response (201)
 */
export class XMoneyOrderResponse {
  @ApiProperty({
    description: 'Response code',
    type: 'number',
  })
  code!: number;

  @ApiProperty({
    description: 'Response message',
  })
  message!: string;

  @ApiPropertyOptional({
    description: 'Response data',
    type: () => XMoneyOrderResponseData,
    required: false,
  })
  @IsOptional()
  data?: XMoneyOrderResponseData;
}

/**
 * Error object in failed response
 */
export class XMoneyOrderError {
  @ApiPropertyOptional({
    description: 'System error code',
    type: 'number',
    required: false,
  })
  @IsOptional()
  code?: number;

  @ApiPropertyOptional({
    description: 'System error message',
    required: false,
  })
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({
    description: 'System error type',
    enum: XMoneyErrorType,
    enumName: 'XMoneyErrorType',
    required: false,
  })
  @IsOptional()
  type?: XMoneyErrorType;

  @ApiPropertyOptional({
    description: 'Field name that caused the error',
    required: false,
  })
  @IsOptional()
  field?: string;
}

/**
 * Failed order response data (402)
 */
export class XMoneyOrderErrorResponseData {
  @ApiProperty({
    description: 'Order ID from xMoney',
    type: 'number',
  })
  orderId!: number;

  @ApiPropertyOptional({
    description: 'Transaction ID from xMoney',
    type: 'number',
    required: false,
  })
  @IsOptional()
  transactionId?: number;
}

/**
 * Failed order response (402)
 */
export class XMoneyOrderErrorResponse {
  @ApiProperty({
    description: 'Response code',
    type: 'number',
  })
  code!: number;

  @ApiProperty({
    description: 'Response message',
  })
  message!: string;

  @ApiPropertyOptional({
    description: 'Response data',
    type: () => XMoneyOrderErrorResponseData,
    required: false,
  })
  @IsOptional()
  data?: XMoneyOrderErrorResponseData;

  @ApiPropertyOptional({
    description: 'Array of errors',
    type: [XMoneyOrderError],
    isArray: true,
    required: false,
  })
  @IsOptional()
  error?: XMoneyOrderError[];
}

/**
 * Combined order response type (can be success or error)
 */
export type XMoneyOrderResult = XMoneyOrderResponse | XMoneyOrderErrorResponse;
