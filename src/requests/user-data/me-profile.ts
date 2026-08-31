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

  /**
   * Native-token balance and its fiat value, denormalised onto the profile so
   * the caller does not need a second round trip to
   * `/user/:address/network-account` purely to render them.
   *
   * Optional, and both are omitted together: the balance is read live from the
   * chain, and a read that fails degrades to leaving them unset rather than
   * failing the whole profile. Consumers must treat `undefined` as "unknown",
   * not as zero.
   *
   * This is deliberately NOT the full network-account payload. That response
   * also carries `nonce`, `guarded` and `activeGuardian`, which MultiversX
   * callers use to build transactions; those must keep coming from the
   * dedicated endpoint so they are read fresh at signing time rather than
   * from a profile response.
   */
  @ApiProperty({ example: 9.3326825, required: false })
  balanceShort?: number;

  @ApiProperty({ example: 1.636, required: false })
  usdValue?: number;
}

export class UserProfileEditDto extends PartialType(
  PickType(UserProfileDoc, [
    'socials',
    'description',
    'isBoberBattleUser',
  ] as const),
) {}
