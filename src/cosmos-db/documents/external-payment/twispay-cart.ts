import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ItemType } from '../../../enums/external-payment-status.enum';

//https://twispay.github.io/
export class TwispayCartItems {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Premium NFT Collection',
    maxLength: 255,
  })
  item!: string; //name of the product

  @ApiProperty({
    description:
      'Unit price as string (can have negative value for discounts, vouchers, etc.) – including VAT',
    example: '99.99',
  })
  unitPrice!: string; //float (can have negative value for discounts, vouchers, etc.) – including VAT

  @ApiProperty({
    description: 'Quantity of items',
    type: 'number',
    example: 1,
    minimum: 1,
  })
  units!: number; //quantity

  @ApiProperty({
    description: 'Type of item (physical or digital)',
    enum: ItemType,
    enumName: 'ItemType',
    example: ItemType.digital,
  })
  type!: ItemType;

  @ApiProperty({
    description: 'Code of the item',
    example: 'NFT-001',
    maxLength: 64,
  })
  code!: string; //code of the item => string - varchar 64

  @ApiPropertyOptional({
    description: 'VAT percentage',
    type: 'number',
    example: 19,
    minimum: 0,
    maximum: 100,
  })
  vatPercent?: number; //VAT percent

  @ApiProperty({
    description: 'Description of the item',
    example: 'Exclusive digital collectible from the premium collection',
    maxLength: 500,
  })
  itemDescription!: string; //string - varchar 500
}
