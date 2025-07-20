import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { UserProfileDoc } from '../../cosmos-db/documents/user/user-profile.doc';
import {
  UserEmailNotificationSettings,
  UserNotificationPreferences,
} from '../../cosmos-db/documents/user/user-settings.doc';

class UserSettingsDto {
  @ApiProperty({ type: UserEmailNotificationSettings })
  emailNotifications!: UserEmailNotificationSettings;

  @ApiProperty({ type: UserNotificationPreferences })
  notificationPreferences!: UserNotificationPreferences;

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

export class UserProfileDto extends UserProfileDoc {
  @ApiProperty({ type: UserSettingsDto, required: false })
  userSettings!: UserSettingsDto;
}

export class UserProfileEditDto extends PartialType(
  PickType(UserProfileDoc, [
    'socials',
    'description',
    'profile',
    'isAnalyticsEnabled',
  ] as const),
) {}
