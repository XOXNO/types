import { ApiProperty } from '@nestjs/swagger';

export class NftMetadataAttributes {
  @ApiProperty({ required: true, type: String, example: 'Background' })
  trait_type!: string;

  @ApiProperty({ required: true, type: String, example: 'Black' })
  value!: string;

  constructor(json: Partial<NftMetadataAttributes>) {
    this.trait_type = json?.trait_type?.toString().trim() ?? '';
    this.value = json?.value?.toString().trim() ?? '';
  }
}
