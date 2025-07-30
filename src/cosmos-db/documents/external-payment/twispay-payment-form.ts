import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TwispayTransactionStatus } from '../../../enums/twispay.enum';
import { ExternalPaymentRequest } from './external-payment-request';

export class TwispayCallBackData {
  @ApiProperty({
    description: 'Status of the Twispay transaction',
    enum: TwispayTransactionStatus,
    enumName: 'TwispayTransactionStatus',
  })
  transactionStatus!: TwispayTransactionStatus;

  @ApiProperty({
    description: 'Order ID from Twispay',
    example: 'ORDER_123456',
  })
  orderId!: string;

  @ApiProperty({
    description: 'Transaction ID from Twispay',
    oneOf: [{ type: 'number' }, { type: 'string' }],
    example: 'TXN_789012',
  })
  transactionId!: number | string;

  @ApiProperty({
    description: 'External order ID reference',
    example: 'EXT_ORDER_456789',
  })
  externalOrderId!: string;

  @ApiProperty({
    description: 'Transaction amount',
    type: 'number',
    example: 100.0,
  })
  amount!: number;

  @ApiProperty({
    description: 'Customer identifier',
    example: 'CUST_123456',
  })
  identifier!: string;

  @ApiProperty({
    description: 'Currency code',
    example: 'USD',
  })
  currency!: string;

  @ApiProperty({
    description: 'Unix timestamp of the transaction',
    type: 'number',
    example: 1672531200,
  })
  timestamp!: number;

  @ApiProperty({
    description: 'Customer ID from Twispay',
    example: 'TWISPAY_CUST_789',
  })
  customerId!: string;

  @ApiProperty({
    description: 'Custom data containing the external payment request',
    type: () => ExternalPaymentRequest,
  })
  customData!: ExternalPaymentRequest;

  @ApiPropertyOptional({
    description: 'Array of errors if any occurred',
    type: [Object],
    example: [{ code: 'ERR_001', message: 'Payment failed' }],
  })
  errors?: unknown[];
}
