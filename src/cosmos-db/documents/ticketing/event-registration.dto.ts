import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import { EventGuestProfile } from './event-guest.doc';
import { PaymentProvider } from '../../../enums/payment-provider.enum';

class TwispayPaymentFormData {
  @ApiProperty()
  base64JsonRequest!: string;

  @ApiProperty()
  base64Checksum!: PromiseLike<ArrayBuffer>;
}

class StripePaymentFormData {
  @ApiProperty()
  sessionId!: string;

  @ApiProperty()
  publicKey!: string;
}

@ApiExtraModels(TwispayPaymentFormData, StripePaymentFormData)
class FiatPaymentForm {
  @ApiProperty({
    enum: PaymentProvider,
    enumName: 'PaymentProvider',
  })
  type!: PaymentProvider;

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(TwispayPaymentFormData) },
      { $ref: getSchemaPath(StripePaymentFormData) },
    ],
  })
  data!: TwispayPaymentFormData | StripePaymentFormData;
}

class CryptoPaymentResult {
  @ApiProperty()
  signature!: string;

  @ApiProperty()
  data!: string;
}

export class EventRegistrationResponseDto {
  @ApiProperty({ type: () => EventGuestProfile })
  guestDoc!: EventGuestProfile;

  @ApiPropertyOptional({ type: () => FiatPaymentForm })
  fiatPaymentForm?: FiatPaymentForm;

  @ApiPropertyOptional({ type: () => CryptoPaymentResult })
  cryptoPayment?: CryptoPaymentResult;
}
