import { ApiProperty } from '@nestjs/swagger';

export class NftMetadataAttributes {
  @ApiProperty({ required: true, type: String, example: 'Background' })
  trait_type!: string;

  @ApiProperty({ required: true, type: String, example: 'Black' })
  value!: string;

  constructor(props?: Partial<NftMetadataAttributes>) {
    this.trait_type = props?.trait_type?.toString().trim() ?? '';
    this.value = props?.value?.toString().trim() ?? '';
  }
}
