import {
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  LaunchpadCustomData,
  MarketplaceCustomData,
  TwispayEventTicketCustomData,
} from './external-payment-request';
import { ExternalPaymentInternalStatus } from '../../../enums/external-payment-status.enum';
import { PaymentProvider } from '../../../enums/payment-provider.enum';
import { PurchaseType } from '../../../enums/purchase-type.enum';

export class ExternalPayment {
  @ApiProperty({
    description: 'Internal status of the external payment',
    enum: ExternalPaymentInternalStatus,
    enumName: 'ExternalPaymentInternalStatus',
    example: ExternalPaymentInternalStatus.GeneratePaymentForm,
  })
  internalStatus!: ExternalPaymentInternalStatus;

  @ApiProperty({
    description: 'Wallet address of the user making the payment',
    example: 'erd1qqqqqqqqqqqqqpgqvkm5elqdlpqwlpgdcklhds8u04rn3sf0n0ys5xw6u5',
  })
  address!: string;

  @ApiProperty({
    description: 'Type of purchase being made',
    enum: PurchaseType,
    enumName: 'PurchaseType',
  })
  purchaseType!: PurchaseType;

  @ApiProperty({
    description:
      'Details of the purchase including pricing and item information',
    example: {
      name: 'Exclusive NFT Collection',
      currency: 'USD',
      amount: 100.0,
      egldFiatPrice: 50.0,
      egldPrice: 2.0,
      quantity: 1,
      collection: 'COLLECTION-abc123',
      description: 'Premium digital collectible',
      identifier: 'NFT-001',
    },
    properties: {
      name: { type: 'string', description: 'Name of the item being purchased' },
      currency: {
        type: 'string',
        description: 'Currency code (e.g., USD, EUR)',
      },
      amount: {
        type: 'number',
        description:
          'Total payment amount in specified currency including taxes',
      },
      egldFiatPrice: {
        type: 'number',
        description: 'EGLD price in the specified fiat currency',
        required: false,
      },
      egldPrice: {
        type: 'number',
        description: 'Payment amount in EGLD',
        required: false,
      },
      quantity: {
        type: 'number',
        description: 'Number of items being purchased',
      },
      collection: { type: 'string', description: 'Collection identifier' },
      description: {
        type: 'string',
        description: 'Description of the purchase',
      },
      identifier: {
        type: 'string',
        description: 'Unique identifier for the item',
        required: false,
      },
    },
  })
  purchaseDetails!: {
    name: string;
    currency: string;
    amount: number; // payment price in specific currency + taxes
    egldFiatPrice?: number; // egld price in specific currency
    egldPrice?: number; // payment egld price
    quantity: number;
    collection: string;
    description: string;
    identifier?: string;
  };

  @ApiProperty({
    description: 'Custom data specific to the purchase type',
    oneOf: [
      { $ref: getSchemaPath(MarketplaceCustomData) },
      { $ref: getSchemaPath(LaunchpadCustomData) },
      { $ref: getSchemaPath(TwispayEventTicketCustomData) },
    ],
  })
  requestData!:
    | MarketplaceCustomData
    | LaunchpadCustomData
    | TwispayEventTicketCustomData;

  @ApiProperty({
    description: 'Payment provider used for this transaction',
    enum: PaymentProvider,
    enumName: 'PaymentProvider',
  })
  paymentProvider!: PaymentProvider;

  @ApiProperty({
    description: 'Details from the payment provider',
    example: {
      externalOrderId: 'order_123456',
      transactionId: 'txn_789012',
      transactionStatus: 'completed',
      customerId: 'cust_abc123',
      siteId: 12345,
    },
    properties: {
      externalOrderId: {
        type: 'string',
        description: 'External order ID from payment provider',
        required: false,
      },
      transactionId: {
        type: 'string',
        description: 'Transaction ID from payment provider',
        required: false,
      },
      transactionStatus: {
        type: 'string',
        description: 'Status of the transaction',
        required: false,
      },
      customerId: {
        type: 'string',
        description: 'Customer ID (Twispay specific)',
        required: false,
      },
      siteId: {
        type: 'number',
        description: 'Site ID (Twispay specific)',
        required: false,
      },
    },
  })
  paymentProviderDetails!: {
    externalOrderId?: string;
    transactionId?: string;
    transactionStatus?: string;
    customerId?: string; // twispay
    siteId?: number; // twispay
  };

  @ApiPropertyOptional({
    description: 'Customer details for the payment',
    example: {
      email: 'customer@example.com',
    },
    properties: {
      email: {
        type: 'string',
        description: 'Customer email address',
        required: false,
      },
    },
  })
  customerDetails?: {
    email?: string; // maybe in the future
  };

  @ApiPropertyOptional({
    description: 'Blockchain transaction details',
    example: {
      txHash:
        '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      status: 'success',
    },
    properties: {
      txHash: { type: 'string', description: 'Blockchain transaction hash' },
      status: { type: 'string', description: 'Transaction status on chain' },
    },
  })
  chainDetails?: {
    txHash: string;
    status: string;
  };

  @ApiProperty({
    description: 'Unix timestamp when the payment was created',
    type: 'number',
    example: 1672531200,
  })
  timestamp!: number;

  @ApiPropertyOptional({
    description: 'Time to live in seconds, set only on form creation',
    type: 'number',
    example: 3600,
  })
  ttl?: number; // set only on form creation

  @ApiProperty({
    description: 'Unique identifier for the payment document',
    type: 'string',
    example: 'payment_123456789',
  })
  id!: string;

  @ApiProperty({
    description: 'Partition key for Cosmos DB (typically the address)',
    type: 'string',
    example: 'erd1qqqqqqqqqqqqqpgqvkm5elqdlpqwlpgdcklhds8u04rn3sf0n0ys5xw6u5',
  })
  pk!: string;

  @ApiProperty({
    description: 'Cosmos DB timestamp',
    type: 'number',
    example: 1672531200,
  })
  _ts!: number;

  constructor(props?: Partial<ExternalPayment>) {
    Object.assign(this, props);
    this.pk = this.address;
  }
}
