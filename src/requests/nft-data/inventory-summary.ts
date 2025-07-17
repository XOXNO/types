import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsEnum, IsNumber, IsString, IsUrl } from 'class-validator';
import { ActivityChain } from '../../enums/common.enum';

export class InventorySummaryDto {
  @ApiProperty({ description: 'Collection identifier' })
  @IsString()
  collection!: string;

  @ApiProperty({ description: 'Number of NFTs in inventory' })
  @IsNumber()
  inventoryCount!: number;

  @ApiProperty({ description: 'Number of listed NFTs' })
  @IsNumber()
  listedCount!: number;

  @ApiProperty({ description: 'Number of staked NFTs' })
  @IsNumber()
  stakedCount!: number;
}

export class InventorySummaryDtoHydrated extends InventorySummaryDto {
  @ApiProperty({ description: 'Floor price of the collection' })
  @IsNumber()
  floorPrice!: number;

  @ApiProperty({ description: 'Name of the collection' })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Verification status of the collection' })
  @IsBoolean()
  isVerified!: boolean;

  @ApiProperty({ description: 'Visibility status of the collection' })
  @IsBoolean()
  isVisible!: boolean;

  @ApiProperty({ description: 'Profile picture URL of the collection' })
  @IsUrl()
  profile!: string;

  @ApiProperty({ description: 'Banner URL of the collection' })
  @IsUrl()
  banner!: string;

  @ApiProperty({ description: 'Value of the collection' })
  @IsNumber()
  value!: number;

  @ApiProperty({ enum: ActivityChain, required: false })
  chain?: ActivityChain;
}
