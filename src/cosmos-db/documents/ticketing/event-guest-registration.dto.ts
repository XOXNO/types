import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsUUID,
  IsBoolean,
  IsObject,
  IsInt,
  IsNumber,
} from 'class-validator';

import { EventQuestionAnswerDto } from './event-question-answer.doc';

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

export class TicketSelectionDto {
  @ApiProperty({
    description: 'ID of the selected ticket profile',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  ticketProfileId!: string;

  @ApiProperty({
    description: 'ID of the selected ticket stage',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  ticketStageId!: string;

  @ApiProperty({
    description: 'Quantity of tickets selected for this stage',
    minimum: 1,
    type: 'integer',
  })
  @IsNotEmpty()
  @IsInt()
  quantity!: number;

  @ApiProperty({
    description: 'Price of the ticket',
    type: 'number',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: 'Name of the ticket',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Description of the ticket',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Currency of the ticket',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  currency?: string;
}

export class EventGuestRegistrationDto {
  @ApiProperty({
    description: 'Email address of the guest',
    required: false,
    example: 'john@example.com',
    type: String,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Name of the guest',
    example: 'John Doe',
    type: String,
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Phone number of the guest',
    required: false,
    example: '+1234567890',
    type: String,
  })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description: 'Selected tickets',
    type: [TicketSelectionDto],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => TicketSelectionDto)
  ticketSelections!: TicketSelectionDto[];

  @ApiProperty({ description: 'Voucher code', required: false, type: String })
  @IsString()
  @IsOptional()
  voucherCode?: string;

  @ApiProperty({ description: 'Referral code', required: false, type: String })
  @IsString()
  @IsOptional()
  referralCode?: string;

  @ApiProperty({
    description: 'Indicates if the user wants to pay with cryptocurrency',
    required: false,
    default: false,
    type: 'boolean',
  })
  @IsOptional()
  @IsBoolean()
  payWithCrypto?: boolean;

  @ApiProperty({
    description: 'Currency for payment (fiat or crypto token)',
    example: 'EUR',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({
    description: 'Answers to custom questions',
    required: false,
    type: EventQuestionAnswerDto,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventQuestionAnswerDto)
  questionAnswers?: EventQuestionAnswerDto[];

  @ApiProperty({
    description: 'Callback URL',
    required: false,
    type: CallbackUrl,
  })
  @IsOptional()
  @IsObject()
  callbackUrl?: CallbackUrl;
}
