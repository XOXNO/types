import { ApiProperty } from '@nestjs/swagger';

export class XoxnoMarketplaceScCollectionConfig {
  @ApiProperty({
    description: 'Whether cut fees are reversed',
    example: false,
    default: false,
  })
  reversedCutFees: boolean = false;
  @ApiProperty({
    description: 'Whether royalties are reversed',
    example: false,
    default: false,
  })
  reversedRoyalties: boolean = false;
  @ApiProperty({
    description: 'Whether custom royalties are enabled',
    example: false,
    default: false,
  })
  customRoyalties: boolean = false;
  @ApiProperty({
    description: 'Minimum royalties percentage',
    example: 0,
    default: 0,
    minimum: 0,
  })
  minRoyalties: number = 0;
  @ApiProperty({
    description: 'Maximum royalties percentage',
    example: 10,
    default: 0,
    minimum: 0,
  })
  maxRoyalties: number = 0;
  @ApiProperty({
    description: 'Extra fees configuration',
    required: false,
    example: { amount: 2.5, address: 'erd1...' },
  })
  extraFees?: CollectionExtraFeesConfig;
  @ApiProperty({
    description: 'Admin address for the collection',
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
    required: false,
  })
  adminAddress?: string;

  constructor(props?: Partial<CollectionExtraFeesConfig>) {
    Object.assign(this, props);
    this.maxRoyalties = parseInt(this.maxRoyalties.toString()) / 100;
    this.minRoyalties = parseInt(this.minRoyalties.toString()) / 100;
    if (this.extraFees) {
      this.extraFees.amount = parseInt(this.extraFees.amount.toString()) / 100;
    }
  }
}

export class CollectionExtraFeesConfig {
  @ApiProperty({
    description: 'Extra fee amount percentage',
    example: 2.5,
    minimum: 0,
  })
  amount!: number;

  @ApiProperty({
    description: 'Address to receive extra fees',
    example: 'erd1qqqqqqqqqqqqqpgqw0t0ef0jdpeva2v7qy7q7qjjfq6yq0wq0w0qjjfq6yq',
  })
  address!: string;
}
