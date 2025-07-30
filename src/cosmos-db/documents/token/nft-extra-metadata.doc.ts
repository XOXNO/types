import { ApiProperty } from '@nestjs/swagger';
import { NftExtraAttributesType } from '../../../enums/nft-extra-attributes.enum';
import { TokenDataType } from '../../../enums/token-data.enum';

export class NftExtraMetadata {
  @ApiProperty({
    enum: TokenDataType,
    enumName: 'TokenDataType',
    default: TokenDataType.NftExtraMetadata,
    description: 'The type of data this document represents',
  })
  dataType: TokenDataType = TokenDataType.NftExtraMetadata;

  @ApiProperty({
    type: String,
    description: 'Unique identifier of the NFT',
    example: 'XOXNO-12345-01',
  })
  identifier!: string;

  @ApiProperty({
    type: String,
    description: 'Collection identifier this NFT belongs to',
    example: 'XOXNO-12345',
  })
  collection!: string;

  @ApiProperty({
    enum: NftExtraAttributesType,
    enumName: 'NftExtraAttributesType',
    description: 'The type of extra attributes stored for this NFT',
  })
  type!: NftExtraAttributesType;

  @ApiProperty({
    type: [Object],
    description: 'Array of attribute key-value pairs for extra metadata',
    example: [{ trait_type: 'Background', value: 'Blue' }],
  })
  attributes!: Record<string, string>[];

  @ApiProperty({
    type: String,
    description: 'Unique document ID composed of identifier and data type',
  })
  id!: string;

  constructor(props?: Partial<NftExtraMetadata>) {
    Object.assign(this, props);
    this.id = `${this.identifier}-${TokenDataType.NftExtraMetadata}`;
  }
}
