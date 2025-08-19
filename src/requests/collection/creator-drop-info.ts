// DTO Type
import { ApiProperty } from '@nestjs/swagger';

import { ShortCollectionInfoDoc } from '../../cosmos-db/documents/short/short-collection-info.doc';
import { EgldOrEsdtTokenPayment } from '../../common/tokenPayent';
import { SocialsDto } from '../../common/socials';
import { CollectionDataType } from '../../enums';

export class MintStageDto {
  @ApiProperty({ example: 'mintStage' })
  dataType = CollectionDataType.MintStage;

  @ApiProperty({ example: 'MICE-a0c447' })
  collection!: string;

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgq2t6ef4u9ts3j86504sx0zlvw0vujfq6yys5sqfg40f',
  })
  contractAddress!: string;

  @ApiProperty({ example: 'MiceCity' })
  collectionTag!: string;

  @ApiProperty({ example: 'MiceCity' })
  name!: string;

  @ApiProperty({ example: 1645210800 })
  startTime!: number;

  @ApiProperty({ example: 0 })
  endTime!: number;

  @ApiProperty({ example: 5583 })
  mintCount!: number;

  @ApiProperty({ example: 8000 })
  mintLimit!: number;

  @ApiProperty({ example: true })
  mintEnabled!: boolean;

  @ApiProperty({ example: false })
  isWhitelist!: boolean;

  @ApiProperty({ example: 0 })
  walletLimit!: number;

  @ApiProperty({ type: EgldOrEsdtTokenPayment, isArray: true })
  prices!: EgldOrEsdtTokenPayment[];

  @ApiProperty({ example: 'MICE-a0c447-MiceCity-mintStage' })
  id!: string;

  @ApiProperty({ example: 1720568180 })
  _ts!: number;

  @ApiProperty({ example: false })
  walletLimitReached!: boolean;

  @ApiProperty({ example: null, nullable: true })
  maxBuyable!: number | null;

  @ApiProperty({ required: false })
  userMintsPerStage?: number;

  constructor(props?: Partial<MintStageDto>) {
    Object.assign(this, props);
    this.id = `${this.collection}-${this.name}-${this.dataType}`;
  }
}

export class CreatorInfoDto {
  @ApiProperty({ example: 'MiceCityClub' })
  name!: string;

  @ApiProperty({ example: 'Welcome to the 1980s' })
  description!: string;

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgq2t6ef4u9ts3j86504sx0zlvw0vujfq6yys5sqfg40f',
  })
  contractAddress!: string;

  @ApiProperty({
    example: 'erd10ugfytgdndw5qmnykemjfpd7xrjs63f0r2qjhug0ek9gnfdjxq4s8qjvcx',
  })
  address!: string;

  @ApiProperty({
    example: 'https://media.xoxno.com/utils/defaultProfilePic.webp',
  })
  profile: string = 'https://media.xoxno.com/utils/defaultProfilePic.webp';

  @ApiProperty({ example: 'https://media.xoxno.com/utils/defaultBanner.webp' })
  banner: string = 'https://media.xoxno.com/utils/defaultBanner.webp';

  @ApiProperty({ example: 1645192020 })
  joinedDate!: number;

  @ApiProperty({ example: 'MiceCityClub' })
  creatorTag!: string;

  @ApiProperty({ description: 'Creator social media links', required: false })
  socials?: SocialsDto;
}

export class DropInfoDto {
  @ApiProperty({ example: 'MICE-a0c447' })
  collection!: string;

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgq2t6ef4u9ts3j86504sx0zlvw0vujfq6yys5sqfg40f',
  })
  contractAddress!: string;

  @ApiProperty({ example: 'MiceCity' })
  collectionTag!: string;

  @ApiProperty({ example: false })
  nftTransferLimited!: boolean;

  @ApiProperty({ example: false })
  hasBotProtection!: boolean;

  @ApiProperty({ example: false })
  kycRequired!: boolean;

  @ApiProperty({ example: 5583 })
  totalNftMinted!: number;

  @ApiProperty({ example: 8000 })
  collectionSize!: number;

  @ApiProperty({ example: 'QmWEwSi9AhgMPeu4CJfLpWq1yKSfmERZXt76b429pVSU9R' })
  cid!: string;

  @ApiProperty({ example: '.png' })
  mediaType!: string;

  @ApiProperty({ example: 0 })
  userMintsGlobal!: number;

  @ApiProperty({ example: 0 })
  globalWalletLimit!: number;

  @ApiProperty({ type: MintStageDto, isArray: true })
  mintStages!: MintStageDto[];

  @ApiProperty({ type: () => ShortCollectionInfoDoc })
  collectionInfo!: ShortCollectionInfoDoc;

  @ApiProperty({ type: CreatorInfoDto })
  creatorInfo!: CreatorInfoDto;
}
