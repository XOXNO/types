import { ApiProperty } from '@nestjs/swagger';
import { EgldOrEsdtTokenPayment } from '../../common/tokenPayent';

import { CollectionInfoDto } from './collection-info.dto';

class CreatorInfoDto {
  @ApiProperty({ example: 'Marcel81' })
  name!: string;

  @ApiProperty({
    example: 'erd1qqqqqqqqqqqqqpgqzty6ekd0dwte8r3d45kt78el9yle5vmkys5sr86uws',
  })
  contractAddress!: string;

  @ApiProperty({
    example: 'https://media.xoxno.com/utils/defaultProfilePic.webp',
  })
  profile!: string;
}

class DropResourceDto {
  @ApiProperty({ type: EgldOrEsdtTokenPayment, isArray: true })
  prices!: EgldOrEsdtTokenPayment[];

  @ApiProperty({ example: 1720587300 })
  startTime!: number;

  @ApiProperty({ example: false })
  isSoldOut!: boolean;

  @ApiProperty({ example: 'Nfthero' })
  collectionTag!: string;

  @ApiProperty({ example: 4 })
  collectionSize!: number;

  @ApiProperty({ example: 0 })
  totalNftMinted!: number;

  @ApiProperty({ example: '1000-76443d' })
  collection!: string;

  @ApiProperty({ example: 'Marcel81' })
  creatorTag!: string;

  @ApiProperty({ example: 'Marcel81' })
  creatorName!: string;

  @ApiProperty({ example: 1722401700 })
  endTime!: number;

  @ApiProperty({ type: () => CollectionInfoDto })
  collectionInfo!: CollectionInfoDto;

  @ApiProperty({ type: CreatorInfoDto })
  creatorInfo!: CreatorInfoDto;
}

export class DropsQueryDto {
  @ApiProperty({ example: null, required: false })
  count!: number | null;

  @ApiProperty({ example: true })
  hasMoreResults!: boolean;

  @ApiProperty({ type: DropResourceDto, isArray: true })
  resources!: DropResourceDto[];
}
