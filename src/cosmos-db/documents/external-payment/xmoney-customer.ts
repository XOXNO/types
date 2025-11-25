import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { XMoneyErrorType } from '../../../enums/xmoney.enum';

// xMoney Customer API Types based on xMoney API documentation
// https://docs.xmoney.com/api/reference/customer/create-a-customer.md
// Note: xMoney API expects application/x-www-form-urlencoded content type

/**
 * xMoney Customer Request - for creating customers
 */
export class XMoneyCustomerRequest {
  @ApiProperty({
    description: 'External identifier for the customer (e.g., wallet address)',
  })
  identifier!: string;

  @ApiProperty({
    description: "Customer's email address",
    format: 'email',
  })
  email!: string;

  @ApiPropertyOptional({
    description:
      'Site profile identifier; required if multiple sites configured',
    type: 'number',
    required: false,
  })
  @IsOptional()
  siteId?: number;

  @ApiPropertyOptional({
    description: "Customer's first name",
    required: false,
  })
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({
    description: "Customer's last name",
    required: false,
  })
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({
    description: "Customer's country (ISO 3166-1 alpha-2 code)",
    example: 'US',
    minLength: 2,
    maxLength: 2,
    required: false,
  })
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({
    description: "Customer's state (ISO 3166-2 code, for US/CA)",
    example: 'NY',
    required: false,
  })
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({
    description: "Customer's city of residence",
    required: false,
  })
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({
    description: "Customer's postal/zip code",
    required: false,
  })
  @IsOptional()
  zipCode?: string;

  @ApiPropertyOptional({
    description: "Customer's street address",
    required: false,
  })
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    description: "Customer's phone number",
    required: false,
  })
  @IsOptional()
  phone?: string;
}

/**
 * xMoney Customer Response Data (201 Created)
 */
export class XMoneyCustomerResponseData {
  @ApiProperty({
    description: 'The newly created customer ID',
    type: 'number',
  })
  id!: number;
}

/**
 * xMoney Customer Success Response (201)
 */
export class XMoneyCustomerResponse {
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
    description: 'Response data containing the customer ID',
    type: () => XMoneyCustomerResponseData,
    required: false,
  })
  @IsOptional()
  data?: XMoneyCustomerResponseData;
}

/**
 * xMoney Customer Error
 */
export class XMoneyCustomerError {
  @ApiPropertyOptional({
    description: 'Error code',
    type: 'number',
    required: false,
  })
  @IsOptional()
  code?: number;

  @ApiPropertyOptional({
    description: 'Error message',
    required: false,
  })
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({
    description: 'Error type',
    enum: XMoneyErrorType,
    enumName: 'XMoneyErrorType',
    required: false,
  })
  @IsOptional()
  type?: XMoneyErrorType;

  @ApiPropertyOptional({
    description: 'Field that caused the error',
    required: false,
  })
  @IsOptional()
  field?: string;
}

/**
 * xMoney Customer Error Response (400/409)
 */
export class XMoneyCustomerErrorResponse {
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
    description: 'Array of errors',
    type: [XMoneyCustomerError],
    isArray: true,
    required: false,
  })
  @IsOptional()
  error?: XMoneyCustomerError[];
}

/**
 * Combined customer response type
 */
export type XMoneyCustomerResult =
  | XMoneyCustomerResponse
  | XMoneyCustomerErrorResponse;
