import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ShortNftDoc } from '../../cosmos-db/documents/short/short-nft.doc';
import { ActivityChain } from '../../enums/common.enum';

class WalletDto {
  @ApiProperty({ description: 'User wallet address' })
  @IsString()
  address!: string;

  @ApiProperty({ description: 'User profile picture URL' })
  @IsString()
  profile: string = 'https://media.xoxno.com/utils/defaultProfilePic.webp';

  @ApiProperty({ description: 'Username' })
  @IsString()
  username!: string;

  @ApiProperty({ description: 'Verification status of the user' })
  @IsBoolean()
  isVerified!: boolean;

  @ApiProperty({ description: 'Creator status of the user' })
  @IsBoolean()
  isCreator!: boolean;

  @ApiProperty({ description: 'Number of NFTs owned by the user' })
  @IsNumber()
  owned!: number;

  @ApiProperty({ description: 'Number of NFTs listed by the user' })
  @IsNumber()
  listed!: number;

  @ApiProperty({ description: 'Number of followers' })
  @IsNumber()
  followCount!: number;

  @ApiProperty({ enum: ActivityChain, required: false })
  chain?: ActivityChain;
}

class PriceDataDto {
  @ApiProperty({ description: 'Price of the NFT' })
  @IsNumber()
  price!: number;

  @ApiProperty({ description: 'Timestamp of the transaction' })
  @IsNumber()
  timestamp!: number;

  @ApiProperty({ description: 'NFT identifier' })
  @IsString()
  identifier!: string;

  @ApiProperty({ description: 'Transaction hash' })
  @IsString()
  txHash!: string;

  @ApiProperty({ description: 'USD value of the transaction' })
  @IsNumber()
  usdValue!: number;

  @ApiProperty({
    type: () => ShortNftDoc,
    description: 'NFT information',
    required: false,
  })
  @ValidateNested()
  @IsObject()
  @Type(() => ShortNftDoc)
  nftInfo?: ShortNftDoc;
}

export class UserStatsDto {
  @ApiProperty({
    type: () => WalletDto,
    description: 'User wallet information',
  })
  @ValidateNested()
  @IsObject()
  @Type(() => WalletDto)
  wallet!: WalletDto;

  @ApiProperty({ description: 'Total trading volume' })
  @IsNumber()
  totalVolume!: number;

  @ApiProperty({ description: 'Total number of trades' })
  @IsNumber()
  totalTrades!: number;

  @ApiProperty({ description: 'Total number of collections' })
  @IsNumber()
  totalCollections!: number;

  @ApiProperty({ description: 'Total number of NFTs' })
  @IsNumber()
  totalNfts!: number;

  @ApiProperty({ description: 'Total number of partners' })
  @IsNumber()
  totalPartners!: number;

  @ApiProperty({ description: 'Buyer volume' })
  @IsNumber()
  buyerVolume!: number;

  @ApiProperty({ description: 'Buyer trades' })
  @IsNumber()
  buyerTrades!: number;

  @ApiProperty({ description: 'Buyer NFTs' })
  @IsNumber()
  buyerNfts!: number;

  @ApiProperty({ description: 'Buyer collections' })
  @IsNumber()
  buyerCollections!: number;

  @ApiProperty({ description: 'Buyer partners' })
  @IsNumber()
  buyerPartners!: number;

  @ApiProperty({
    type: () => PriceDataDto,
    description: 'Buyer maximum price data',
  })
  @ValidateNested()
  @IsObject()
  @Type(() => PriceDataDto)
  buyerMaxPriceData!: PriceDataDto;

  @ApiProperty({
    type: () => PriceDataDto,
    description: 'Buyer minimum price data',
  })
  @ValidateNested()
  @IsObject()
  @Type(() => PriceDataDto)
  buyerMinPriceData!: PriceDataDto;

  @ApiProperty({ description: 'Seller volume' })
  @IsNumber()
  sellerVolume!: number;

  @ApiProperty({ description: 'Seller trades' })
  @IsNumber()
  sellerTrades!: number;

  @ApiProperty({ description: 'Seller NFTs' })
  @IsNumber()
  sellerNfts!: number;

  @ApiProperty({ description: 'Seller collections' })
  @IsNumber()
  sellerCollections!: number;

  @ApiProperty({ description: 'Seller partners' })
  @IsNumber()
  sellerPartners!: number;

  @ApiProperty({
    type: () => PriceDataDto,
    description: 'Seller maximum price data',
  })
  @ValidateNested()
  @IsObject()
  @Type(() => PriceDataDto)
  sellerMaxPriceData!: PriceDataDto;

  @ApiProperty({
    type: () => PriceDataDto,
    description: 'Seller minimum price data',
  })
  @ValidateNested()
  @IsObject()
  @Type(() => PriceDataDto)
  sellerMinPriceData!: PriceDataDto;
}
