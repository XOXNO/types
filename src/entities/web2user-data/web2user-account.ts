import { ApiProperty } from '@nestjs/swagger';

import { LinkedAccountType } from '../../enums/linked-account-type.enum';

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

  @ApiProperty({
    type: String,
    description: "User's name",
    example: 'John Doe',
    required: false,
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: "URL of the user's profile picture",
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  profilePicture?: string;

  @ApiProperty({
    type: String,
    description: "User's email address",
    example: 'john.doe@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    type: String,
    description: "User's username",
    example: 'johndoe123',
    required: false,
  })
  username?: string;

  constructor(props: Web2UserAccount) {
    Object.assign(this, props);
  }
}
