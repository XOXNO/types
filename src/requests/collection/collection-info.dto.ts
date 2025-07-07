import { ApiProperty } from '@nestjs/swagger';
import { SocialsDto } from '../../common/socials';

export class CollectionInfoDto {
  @ApiProperty({ example: 'EBMC' })
  name!: string;

  @ApiProperty({ type: () => SocialsDto })
  socials!: SocialsDto;

  @ApiProperty({ example: false })
  isVerified!: boolean;

  @ApiProperty({ example: true })
  isVisible!: boolean;

  @ApiProperty({ example: 'Test collection' })
  description!: string;

  @ApiProperty({
    example:
      'https://media.xoxno.com/collectionprofile/EBMC-8a2d40/profilePicture.webp',
  })
  profile!: string;

  @ApiProperty({
    example:
      'https://media.xoxno.com/collectionprofile/EBMC-8a2d40/profilePicture.webp',
  })
  banner!: string;

  @ApiProperty({ example: 2955 })
  collectionSize!: number;

  @ApiProperty({ example: 16 })
  followCount!: number;

  @ApiProperty({ example: 0 })
  holdersCount!: number;

  @ApiProperty({
    example: 'erd10ugfytgdndw5qmnykemjfpd7xrjs63f0r2qjhug0ek9gnfdjxq4s8qjvcx',
  })
  owner!: string;

  @ApiProperty({ example: 1230.34 })
  volume!: number;
}
