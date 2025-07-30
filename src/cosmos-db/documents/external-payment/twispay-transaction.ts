import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  TwispayTransactionType,
  TwispayIntervalType,
} from '../../../enums/twispay.enum';
import { TwispayCartItems } from './twispay-cart';

//https://twispay.github.io/
export class TwispayOrderDetails {
  @ApiProperty({
    description: 'Order amount (use dot as decimal separator)',
    type: 'number',
    example: 99.99,
  })
  amount!: number; //use dot as decimal separator

  @ApiProperty({
    description: 'Currency code (ISO 4217 three letter code)',
    example: 'USD',
    minLength: 3,
    maxLength: 3,
  })
  currency!: string; //use ISO 4217 three letter code

  @ApiPropertyOptional({
    description: 'Order description (mandatory if items are not defined)',
    example: 'Purchase of exclusive NFT collection',
    maxLength: 77056,
  })
  description?: string; //77056 characters long; mandatory if item is not defined

  @ApiProperty({
    description: 'Type of Twispay transaction',
    enum: TwispayTransactionType,
    enumName: 'TwispayTransactionType',
  })
  type!: TwispayTransactionType;

  @ApiProperty({
    description: 'Your unique identifier for the transaction',
    example: 'ORDER_123456789',
  })
  orderId!: string; //your identifier of the transaction; must be unique for each request

  @ApiPropertyOptional({
    description:
      'Comma separated values representing retry intervals for failed re-bill payments (ISO 8601 Durations)',
    example: 'P1D,P2D,P3D',
  })
  retryPayment?: string; // Comma separated values representing retry intervals for failed re-bill payments, use ISO 8601 Durations [ex: P1D,P2D,P3D]

  @ApiPropertyOptional({
    description: 'Array of tags for the order',
    type: [String],
    example: ['recurring', 'premium'],
    isArray: true,
  })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Recurring interval type (for subscription plans)',
    enum: TwispayIntervalType,
    enumName: 'TwispayIntervalType',
  })
  intervalType?: TwispayIntervalType; //recurring interval value; Eg. Set "intervalValue" = 1 and "intervalType" = month; for a monthly subscription plan

  @ApiPropertyOptional({
    description: 'Recurring interval value (used with intervalType)',
    type: 'number',
    example: 1,
    minimum: 1,
  })
  intervalValue?: number;

  @ApiPropertyOptional({
    description: 'Trial amount (cannot be 0)',
    type: 'number',
    example: 9.99,
    minimum: 0.01,
  })
  trialAmount?: number; //use dot as decimal separator; cannot be 0 (zero)

  @ApiPropertyOptional({
    description:
      'Date of first recurring payment (ISO 8601 format with timezone)',
    example: '2024-02-01T10:00:00Z',
    format: 'date-time',
  })
  firstBillDate?: string; //use ISO 8601 date, time and timezone offset; declare the date of the first recurring payment

  @ApiPropertyOptional({
    description: 'Array of cart items',
    type: [TwispayCartItems],
    isArray: true,
  })
  items?: TwispayCartItems[];
}

// cardTransactionMode: TwispayCardTransactionMode;
//   backUrl: string; // used to redirect the customers back to the merchant's site; we also post an encrypted transaction result to this URL
//   cardId?: number; //id of a previously used card for this customer
//   invoiceEmail?: string; //an alternative email address to send invoice to
//   custom?: string[]; //associative array of string values
