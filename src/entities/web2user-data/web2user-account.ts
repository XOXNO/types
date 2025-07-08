import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { LinkedAccountType } from './linked-account-type.enum';

export class Web2UserAccount {
  @ApiProperty({
    enum: LinkedAccountType,
    enumName: 'LinkedAccountType',
    description: 'Type of linked account',
    example: LinkedAccountType.GOOGLE,
  })
  type!: LinkedAccountType;

  @ApiProperty({
    type: String,
    description: 'User ID from the provider',
    example: '123456789',
  })
  subject!: string;

  @ApiPropertyOptional({
    type: String,
    description: "User's name",
    example: 'John Doe',
  })
  name?: string;

  @ApiPropertyOptional({
    type: String,
    description: "URL of the user's profile picture",
    example: 'https://example.com/profile.jpg',
  })
  profilePicture?: string;

  @ApiPropertyOptional({
    type: String,
    description: "User's email address",
    example: 'john.doe@example.com',
  })
  email?: string;

  @ApiPropertyOptional({
    type: String,
    description: "User's username",
    example: 'johndoe123',
  })
  username?: string;

  constructor(props: Web2UserAccount) {
    Object.assign(this, props);
  }
}
