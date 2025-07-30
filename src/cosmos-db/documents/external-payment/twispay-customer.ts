import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

//https://twispay.github.io/
export class TwispayCustomerDetails {
  @ApiProperty({
    description: 'Unique identifier for the customer',
    minLength: 1,
    example: 'CUST_123456',
  })
  identifier!: string;

  @ApiProperty({
    description: 'Customer first name',
    example: 'John',
  })
  firstName!: string;

  @ApiProperty({
    description: 'Customer last name',
    example: 'Doe',
  })
  lastName!: string;

  @ApiProperty({
    description: 'Country code using ISO 3166-1 alpha-2 format',
    example: 'US',
    minLength: 2,
    maxLength: 2,
  })
  country!: string; //use https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

  @ApiPropertyOptional({
    description:
      'State/Province code (mandatory for US and CA; use 2 letters ISO 3166-2:US for US and ISO 3166-2:CA for CA)',
    example: 'NY',
    minLength: 2,
    maxLength: 2,
  })
  state?: string; //mandatory for US and CA; use 2 letters ISO 3166-2:US for US and ISO 3166-2:CA for CA. Eg. NY

  @ApiProperty({
    description: 'City name',
    example: 'New York',
  })
  city!: string;

  @ApiPropertyOptional({
    description: 'Zip/Postal code (no spaces allowed)',
    example: '10001',
    pattern: '^\\S+$',
  })
  zipCode?: string; // no spaces allowed

  @ApiPropertyOptional({
    description: 'Customer address',
    example: '123 Main Street, Apt 4B',
  })
  address?: string;

  @ApiProperty({
    description: 'Phone number (no spaces allowed)',
    example: '+1234567890',
    pattern: '^\\S+$',
  })
  phone!: string; // no spaces allowed

  @ApiProperty({
    description: 'Customer email address',
    example: 'customer@example.com',
    format: 'email',
  })
  email!: string;

  @ApiPropertyOptional({
    description: 'Array of tags associated with the customer',
    type: [String],
    example: ['VIP', 'Premium'],
    isArray: true,
  })
  tags?: string[];
}
