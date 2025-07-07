import { ApiProperty } from '@nestjs/swagger';

export class PinnedCollectionDto {
  @ApiProperty({ example: 'EAPES-8f3c1f' })
  collection!: string;

  @ApiProperty({ example: 'EAPES' })
  name!: string;

  @ApiProperty({ example: true })
  isVerified!: boolean;

  @ApiProperty({
    example:
      'https://media.xoxno.com/collectionprofile/EAPES-8f3c1f/profilePicture.webp?ts=1691359925',
  })
  profile!: string;

  @ApiProperty({
    example:
      'https://media.xoxno.com/collectionprofile/EAPES-8f3c1f/profilebanner.webp',
  })
  banner!: string;

  @ApiProperty({
    example:
      'EAPES is a collection of 10,000 unique 3D APEs living on the MultiversX blockchain',
  })
  description!: string;

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgq7gma4udjeh3mwuq4lmk7wccgh0tenxu6yv5qc2csfy',
  })
  creator!: string;

  @ApiProperty({ example: false, required: false })
  isMintable?: boolean;
}
