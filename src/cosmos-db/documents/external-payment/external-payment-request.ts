import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { PaymentProvider } from './payment-provider.enum';
import { PurchaseType } from './purchase-type.enum';

export class CallbackUrl {
  @ApiProperty()
  @IsString()
  success!: string;

  @ApiProperty()
  @IsString()
  error!: string;

  @ApiProperty()
  @IsString()
  successClose!: string;

  @ApiProperty()
  @IsString()
  errorClose!: string;
}

export class MarketplaceCustomData {
  @ApiProperty()
  @IsNumber()
  quantity!: number;

  @ApiProperty()
  @IsNumber()
  auctionId!: number;
}

export class LaunchpadCustomData {
  @ApiProperty()
  @IsNumber()
  quantity!: number;

  @ApiProperty()
  @IsString()
  collectionTag!: string;

  @ApiProperty()
  @IsString()
  stage!: string;

  @ApiProperty()
  @IsString()
  mintSC!: string;
}

export class TicketInfo {
  @ApiProperty({ description: 'ID of the ticket profile' })
  ticketProfileId!: string;

  @ApiProperty({ description: 'ID of the ticket stage' })
  ticketStageId!: string;

  @ApiProperty({ description: 'Quantity of tickets' })
  quantity!: number;

  @ApiProperty({ description: 'Price of the ticket' })
  price!: number;
}

export class TwispayEventTicketCustomData {
  @ApiProperty({ description: 'ID of the event' })
  eventId!: string;

  @ApiProperty({ description: 'Wallet address of the customer' })
  address!: string;

  @ApiProperty({ description: 'Contract address of the event' })
  contractAddress!: string;

  @ApiProperty({ description: 'Collection ID of the event' })
  collectionId!: string;

  @ApiProperty({ description: 'Quantity of tickets' })
  quantity!: number;

  @ApiProperty({
    description: 'Array of ticket information',
    type: [TicketInfo],
  })
  tickets!: TicketInfo[];
}

export class ExternalPaymentRequest {
  @ApiProperty()
  @IsString()
  address!: string;

  @ApiProperty({ enum: PurchaseType, enumName: 'PurchaseType' })
  @IsEnum(PurchaseType)
  purchaseType!: PurchaseType;

  @ApiProperty({ enum: PaymentProvider, enumName: 'PaymentProvider' })
  @IsEnum(PaymentProvider)
  paymentProvider!: PaymentProvider;

  @ApiProperty()
  @IsString()
  currency!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ type: String, isArray: true, required: false })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({ enum: ['embedded', 'custom'], required: false })
  @IsEnum(['embedded', 'custom'])
  @IsOptional()
  uiMode?: 'embedded' | 'custom';

  @ApiProperty()
  @ValidateNested()
  @Type(() => CallbackUrl)
  callbackUrl!: CallbackUrl;

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(MarketplaceCustomData) },
      { $ref: getSchemaPath(LaunchpadCustomData) },
      { $ref: getSchemaPath(TwispayEventTicketCustomData) },
    ],
  })
  @ValidateNested()
  @Type(() => Object)
  customData!:
    | MarketplaceCustomData
    | LaunchpadCustomData
    | TwispayEventTicketCustomData;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  egldPrice?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  egldFiatPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  collection?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  nftNonce?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  identifier?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  paymentProviderId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  docId?: string;
}
