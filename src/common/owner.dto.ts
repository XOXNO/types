import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

/**
 * The single source of truth for an Owner.
 * Used by NestJS for validation and by the frontend as a lightweight type.
 */
export class OwnerDto {
  @ApiProperty({ description: 'Username of the owner' })
  @IsString()
  username!: string;

  @ApiProperty({ description: 'Blockchain address of the owner' })
  @IsString() // You might want a custom validator for addresses
  address!: string;

  @ApiProperty({ description: "URL to the owner's profile picture" })
  @IsUrl()
  profile!: string;
}

/**
 * The lightweight, compile-time-only type for frontend use.
 * `import type { Owner } from '@your-org/types';`
 */
export type Owner = OwnerDto;
