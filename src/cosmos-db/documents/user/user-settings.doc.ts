import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsPostalCode,
  IsString,
  Length,
} from 'class-validator';
import { UserDataType } from './user-data.type';

export enum NotificationPreferenceType {
  SALES = 'sales',
  BIDS = 'bids',
  OFFERS_RECEIVED = 'offersReceived',
  OFFERS_ACCEPTED = 'offersAccepted',
  OFFERS_REJECTED = 'offersRejected',
  DEPOSITS = 'deposits',
}

export class UserBillingDetails {
  @IsBoolean()
  @ApiProperty({ description: 'Indicates whether the guest is a company.' })
  isCompany!: boolean;

  @IsString()
  @Length(5, 50)
  @ApiProperty({ description: 'Name of the company or user.' })
  name!: string;

  @IsString()
  @Length(0, 50)
  @IsOptional()
  @ApiProperty({ description: 'Company registration number.', required: false })
  companyRegistrationNumber?: string;

  @IsString()
  @Length(0, 50)
  @IsOptional()
  @ApiProperty({ description: 'Company VAT number.', required: false })
  companyVatNumber?: string;

  @IsEmail()
  @Length(1, 50)
  @ApiProperty({ description: 'Email address.' })
  email!: string;

  @IsString()
  @Length(1, 50)
  @ApiProperty({ description: 'Country' })
  country!: string;

  @IsString()
  @Length(1, 100)
  @ApiProperty({ description: 'City' })
  city!: string;

  @IsString()
  @Length(1, 100)
  @ApiProperty({
    description: 'Address line 1',
  })
  address1!: string;

  @IsString()
  @Length(0, 100)
  @IsOptional()
  @ApiProperty({
    description: 'Address line 2',
    required: false,
  })
  address2?: string;

  @IsPostalCode('any', { message: 'Invalid postal code' })
  @Length(0, 15)
  @IsOptional()
  @ApiProperty({
    description: 'Postal code',
    required: false,
  })
  postalCode?: string;
}

export class UserNotificationPreferences {
  @ApiProperty({ description: 'Sales notifications', required: false })
  sales = false;

  @ApiProperty({ description: 'Bids notifications', required: false })
  bids = false;

  @ApiProperty({
    description: 'Offers received notifications',
    required: false,
  })
  offersReceived = false;

  @ApiProperty({
    description: 'Offers accepted notifications',
    required: false,
  })
  offersAccepted = false;

  @ApiProperty({
    description: 'Offers rejected notifications',
    required: false,
  })
  offersRejected = false;

  @ApiProperty({
    description: 'Deposits notifications',
    required: false,
  })
  deposits = false;

  @ApiProperty({
    description: 'Event updates from organizers',
    required: false,
  })
  eventUpdates = false;

  @ApiProperty({
    description: 'Event reminders before start time',
    required: false,
  })
  eventReminders = true;

  @ApiProperty({
    description: 'Event check-in notifications',
    required: false,
  })
  eventCheckIn = true;

  @ApiProperty({
    description: 'Marketing notifications from past event creators',
    required: false,
  })
  eventMarketing = false;

  constructor(props?: Partial<UserNotificationPreferences>) {
    Object.assign(this, props);
  }
}

export class UserEmailNotificationSettings {
  @ApiProperty({ description: 'Email notifications enabled' })
  enabled = false;

  @ApiProperty({ description: 'Email address' })
  emailAddress = '';

  @ApiProperty({ description: 'Email verification pending' })
  isEmailVerificationPending = false;

  @ApiProperty({ description: 'Email verified' })
  isEmailVerified = false;

  @ApiProperty({ description: 'Web2 user' })
  isWeb2User = false;

  @ApiProperty({ description: 'Timestamp', required: false })
  timestamp?: number;

  constructor(props?: Partial<UserEmailNotificationSettings>) {
    Object.assign(this, props);
  }
}

export class UserPhoneNotificationSettings {
  @ApiProperty({ description: 'Phone notifications enabled' })
  enabled = false;

  @ApiProperty({ description: 'Phone number' })
  phoneNumber = '';

  @ApiProperty({ description: 'Phone verification pending' })
  isPhoneVerificationPending = false;

  @ApiProperty({ description: 'Phone verified' })
  isPhoneVerified = false;

  @ApiProperty({ description: 'Timestamp', required: false })
  timestamp?: number;

  constructor(props?: Partial<UserPhoneNotificationSettings>) {
    Object.assign(this, props);
  }
}

export class UserSettingsDoc {
  @ApiProperty({ description: 'Type of user data' })
  dataType: UserDataType = UserDataType.UserSettings;

  @ApiProperty({ description: 'User address' })
  address!: string;

  @ApiProperty({ description: 'User name', required: false })
  name?: string;

  @ApiProperty({ description: 'User billing details', required: false })
  billingDetails?: UserBillingDetails;

  @ApiProperty({ description: 'Email notification settings' })
  emailNotifications: UserEmailNotificationSettings =
    new UserEmailNotificationSettings();

  @ApiProperty({ description: 'Phone notification settings', required: false })
  phoneNotifications?: UserPhoneNotificationSettings;

  @ApiProperty({ description: 'Notification preferences' })
  notificationPreferences: UserNotificationPreferences =
    new UserNotificationPreferences();

  @ApiProperty({ description: 'User ID' })
  id!: string;

  @ApiProperty({ description: 'Timestamp', required: false })
  _ts?: number;

  constructor(props: Partial<UserSettingsDoc>) {
    Object.assign(this, props);
    this.id = `${this.address}-${this.dataType}`;
  }
}
