import { ApiProperty, PickType } from '@nestjs/swagger';
import { SocialsDto } from '../../common/socials';

class UserDepositDto {
  @ApiProperty({ example: '1000000000000000000' })
  balance!: string;

  @ApiProperty({ example: 1 })
  balanceShort!: number;

  @ApiProperty({ example: 1 })
  usdPrice!: number;

  @ApiProperty({ example: 'EGLD' })
  paymentToken!: string;

  @ApiProperty({ example: 0 })
  paymentTokenNonce!: number;
}

class EmailNotificationsDto {
  @ApiProperty({ example: true })
  enabled!: boolean;

  @ApiProperty({ example: 'me@dani.ro' })
  emailAddress!: string;

  @ApiProperty({ example: false })
  isEmailVerificationPending!: boolean;

  @ApiProperty({ example: true })
  isEmailVerified!: boolean;

  @ApiProperty({ example: false })
  isWeb2User!: boolean;

  @ApiProperty({ example: 1720462258, required: false })
  timestamp?: number;
}

class NotificationPreferencesDto {
  @ApiProperty({ example: false })
  sales!: boolean;

  @ApiProperty({ example: false })
  bids!: boolean;

  @ApiProperty({ example: false })
  offersReceived!: boolean;

  @ApiProperty({ example: false })
  offersAccepted!: boolean;

  @ApiProperty({ example: false })
  offersRejected!: boolean;

  @ApiProperty({ example: false })
  deposits!: boolean;
}

class UserSettingsDto {
  @ApiProperty({ type: EmailNotificationsDto })
  emailNotifications!: EmailNotificationsDto;

  @ApiProperty({ type: NotificationPreferencesDto })
  notificationPreferences!: NotificationPreferencesDto;

  @ApiProperty({
    example: 'erd1fmd662htrgt07xxd8me09newa9s0euzvpz3wp0c4pz78f83grt9qm6pn57',
  })
  address!: string;

  @ApiProperty({
    example:
      'erd1fmd662htrgt07xxd8me09newa9s0euzvpz3wp0c4pz78f83grt9qm6pn57-userSettings',
  })
  id!: string;

  @ApiProperty({ example: 1720462258 })
  _ts!: number;
}

export class UserProfileDto {
  @ApiProperty({ example: 'userProfile' })
  dataType!: string;

  @ApiProperty({
    example: 'erd1fmd662htrgt07xxd8me09newa9s0euzvpz3wp0c4pz78f83grt9qm6pn57',
  })
  address!: string;

  @ApiProperty({ example: false })
  isBanned!: boolean;

  @ApiProperty({ example: false })
  isVerified!: boolean;

  @ApiProperty({ type: SocialsDto })
  socials!: SocialsDto;

  @ApiProperty({ example: 1643381871 })
  joinedDate!: number;

  @ApiProperty({
    example:
      'erd1fmd662htrgt07xxd8me09newa9s0euzvpz3wp0c4pz78f83grt9qm6pn57-userProfile',
  })
  id!: string;

  @ApiProperty({
    example:
      'https://media.xoxno.com/collectionprofile/erd1fmd662htrgt07xxd8me09newa9s0euzvpz3wp0c4pz78f83grt9qm6pn57/profilePicture.webp?ts=1718876966',
  })
  profile!: string;

  @ApiProperty({
    example:
      'https://media.xoxno.com/userprofile/erd1fmd662htrgt07xxd8me09newa9s0euzvpz3wp0c4pz78f83grt9qm6pn57/profileBanner.webp?ts=1718876966',
  })
  banner!: string;

  @ApiProperty({ example: 'Testing XOXNO V3.2' })
  description!: string;

  @ApiProperty({ example: '@mihaieremia' })
  herotag!: string;

  @ApiProperty({ example: false })
  isCreator!: boolean;

  @ApiProperty({ example: true })
  isPoolOwner!: boolean;

  @ApiProperty({ type: UserDepositDto, isArray: true })
  userDeposit!: UserDepositDto[];

  @ApiProperty({ example: 0 })
  followCount!: number;

  @ApiProperty({ example: 0 })
  shard!: number;

  @ApiProperty({ example: 1720724856 })
  _ts!: number;

  @ApiProperty({ type: UserSettingsDto, required: false })
  userSettings!: UserSettingsDto;
}

export class UserUpdateDTO extends PickType(UserProfileDto, [
  'socials',
  'description',
  'profile',
]) {}
