import { ApiProperty } from '@nestjs/swagger';
import { EsdtTokenType } from '../../../enums/common.enum';
import { TokenDataType } from '../../../enums/token-data.enum';

export class SftOwnerDoc {
  @ApiProperty({
    description: 'Data type identifier for SFT owner document',
    enum: TokenDataType,
    example: TokenDataType.SftOwner,
    default: TokenDataType.SftOwner,
  })
  dataType = TokenDataType.SftOwner;
  @ApiProperty({
    description: 'Token identifier',
    example: 'COLLECTION-123456-01',
  })
  identifier!: string;
  @ApiProperty({
    description: 'Collection identifier',
    example: 'COLLECTION-123456',
  })
  collection!: string;
  @ApiProperty({
    description: 'Token type',
    example: EsdtTokenType.SemiFungibleESDT,
  })
  type!: string;
  @ApiProperty({
    description: 'Owner address',
    example: 'erd1...',
  })
  owner!: string;
  @ApiProperty({
    description: 'Token balance',
    example: 100,
  })
  balance!: number;
  @ApiProperty({
    description: 'Token balance as string for large numbers',
    example: '1000000000000000000',
    required: false,
  })
  balanceLong?: string;
  @ApiProperty({
    description: 'Whether the token is on sale',
    example: false,
    default: false,
  })
  onSale: boolean = false;
  @ApiProperty({
    description: 'Document ID',
    example: 'COLLECTION-123456-01-erd1...',
    required: false,
  })
  id?: string;
  @ApiProperty({
    description: 'Cosmos DB timestamp',
    example: 1640995200,
    required: false,
  })
  _ts?: number;

  constructor(props?: Partial<SftOwnerDoc>) {
    if (
      props?.type != EsdtTokenType.SemiFungibleESDT &&
      props?.type != EsdtTokenType.MetaESDT
    ) {
      throw new Error(`invalid type [${props?.type}] for sft owner doc`);
    }
    Object.assign(this, props);
    this.id = `${this.identifier}-${this.owner}`;
  }
}
