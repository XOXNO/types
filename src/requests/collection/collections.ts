import { ApiProperty, PickType } from '@nestjs/swagger';

import { SocialsDto } from '../../common/socials';

class OtherDataDto {
  @ApiProperty({ example: 5579 })
  nftCount!: number;

  @ApiProperty({ example: 200 })
  followCount!: number;

  @ApiProperty({ example: 764 })
  holdersCount!: number;
}

class StatisticsDto {
  @ApiProperty({ type: OtherDataDto })
  other!: OtherDataDto;
}

export class CollectionProfileDto {
  @ApiProperty({ example: 'collectionProfile' })
  dataType!: string;

  @ApiProperty({ example: 'MICE-a0c447' })
  collection!: string;

  @ApiProperty({ example: 'MiceCity' })
  name!: string;

  @ApiProperty({
    example:
      'Welcome to the 1980s, set in an alternative Miami populated by mice! Our collection of 8000 uniquely generated retro mice is the ultimate blast from the past, bringing the decade of big hair, excess, pastel suits & neon lights to the MultiversX Blockchain!',
  })
  description!: string;

  @ApiProperty({ example: true })
  isVisible!: boolean;

  @ApiProperty({ example: true })
  isVerified!: boolean;

  @ApiProperty({
    example:
      'https://media.xoxno.com/collectionprofile/MICE-a0c447/profilePicture.webp?ts=1679309756',
  })
  profile!: string;

  @ApiProperty({
    example:
      'https://media.xoxno.com/collectionprofile/MICE-a0c447/profilebanner.webp',
  })
  banner!: string;

  @ApiProperty({ type: StatisticsDto })
  statistics!: StatisticsDto;

  @ApiProperty({
    example: 'erd10ugfytgdndw5qmnykemjfpd7xrjs63f0r2qjhug0ek9gnfdjxq4s8qjvcx',
  })
  owner!: string;

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgq2t6ef4u9ts3j86504sx0zlvw0vujfq6yys5sqfg40f',
  })
  creator!: string;

  @ApiProperty({ example: true })
  isMintable!: boolean;

  @ApiProperty({ example: true })
  hasStaking!: boolean;

  @ApiProperty({ example: 'MICE-a0c447-collectionProfile' })
  id!: string;

  @ApiProperty({ type: SocialsDto })
  socials!: SocialsDto;

  @ApiProperty({ example: 'NonFungibleESDT' })
  type!: string;

  @ApiProperty({ example: 1720568178 })
  _ts!: number;
}

export class CollectionProfileUpdateDto extends PickType(CollectionProfileDto, [
  'socials',
  'description',
  'profile',
]) {}
