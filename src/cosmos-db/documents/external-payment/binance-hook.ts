import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BinanceBizStatus, BinanceBizType } from '../../../enums/binance.enum';

export class PaymentInstruction {
  @ApiProperty({
    description: 'Currency code for the payment instruction',
    example: 'USD',
  })
  currency!: string;

  @ApiProperty({
    description: 'Amount for this payment instruction',
    type: 'number',
    example: 100.0,
  })
  amount!: number; // decimal mapped to number in TypeScript

  @ApiProperty({
    description: 'Price for this payment instruction',
    type: 'number',
    example: 50.0,
  })
  price!: number; // decimal mapped to number in TypeScript
}

export class PaymentInfo {
  @ApiProperty({
    description: 'ID of the payer',
    type: 'number',
    example: 123456789,
  })
  payerId!: number; // long mapped to number in TypeScript

  @ApiProperty({
    description: 'Payment method used',
    example: 'CARD',
  })
  payMethod!: string;

  @ApiProperty({
    description: 'Array of payment instructions',
    type: [PaymentInstruction],
    isArray: true,
  })
  paymentInstructions!: PaymentInstruction[];

  @ApiPropertyOptional({
    description: 'Payment channel',
    example: 'ONLINE',
  })
  channel?: string; // Optional as it's not required

  @ApiPropertyOptional({
    description: 'Payment sub-channel',
    example: 'WEB',
  })
  subChannel?: string; // Optional as it's not required
}

export class BinanceNotificationData {
  @ApiProperty({
    description: 'Merchant trade number',
    example: 'TRADE_123456789',
  })
  merchantTradeNo!: string;

  @ApiProperty({
    description: 'Type of product',
    example: 'NFT',
  })
  productType!: string;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Exclusive NFT Collection',
  })
  productName!: string;

  @ApiProperty({
    description: 'Transaction time as Unix timestamp',
    type: 'number',
    example: 1672531200,
  })
  transactTime!: number; // long mapped to number in TypeScript

  @ApiProperty({
    description: 'Type of trade',
    example: 'BUY',
  })
  tradeType!: string;

  @ApiProperty({
    description: 'Total fee amount',
    type: 'number',
    example: 105.5,
  })
  totalFee!: number; // decimal mapped to number in TypeScript

  @ApiProperty({
    description: 'Currency code',
    example: 'USD',
  })
  currency!: string;

  @ApiPropertyOptional({
    description: 'Transaction ID from Binance',
    example: 'TXN_987654321',
  })
  transactionId?: string; // Optional as it's not required

  @ApiPropertyOptional({
    description: 'Open user ID',
    example: 'USER_123456',
  })
  openUserId?: string; // Optional as it's not required

  @ApiPropertyOptional({
    description: 'Pass-through information',
    example: '{"metadata": "custom data"}',
  })
  passThroughInfo?: string; // Optional as it's not required

  @ApiProperty({
    description: 'Commission amount',
    type: 'number',
    example: 5.25,
  })
  commission!: number; // decimal mapped to number in TypeScript

  @ApiPropertyOptional({
    description: 'Payment information details',
    type: () => PaymentInfo,
  })
  paymentInfo?: PaymentInfo; // Optional as it's not required
}

export class BinanceRequestParameters {
  @ApiProperty({
    description: 'Business type for the Binance request',
    enum: BinanceBizType,
    enumName: 'BinanceBizType',
  })
  bizType!: BinanceBizType;

  @ApiProperty({
    description: 'Business ID',
    type: 'number',
    example: 123456789,
  })
  bizId!: number; // long mapped to number in TypeScript

  @ApiProperty({
    description: 'Business ID as string',
    example: '123456789',
  })
  bizIdStr!: string;

  @ApiProperty({
    description: 'Business status',
    enum: BinanceBizStatus,
    enumName: 'BinanceBizStatus',
  })
  bizStatus!: BinanceBizStatus;

  @ApiProperty({
    description: 'JSON string representation of NotificationData',
    example: '{"merchantTradeNo": "TRADE_123", "productType": "NFT"}',
  })
  data!: string; // Assuming this is a JSON string representation of NotificationData

  @ApiPropertyOptional({
    description: 'Child attribute containing notification data',
    type: () => BinanceNotificationData,
  })
  childAttribute?: BinanceNotificationData; // Assuming child attribute holds NotificationData, and is optional
}
