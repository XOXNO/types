import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { EventGuestDoc } from './event-guest.doc';
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
      { $ref: '#/components/schemas/TwispayPaymentFormData' },
      { $ref: '#/components/schemas/StripePaymentFormData' },
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
  @ApiProperty({ type: () => EventGuestDoc })
  guestDoc!: EventGuestDoc;

  @ApiPropertyOptional({ type: () => FiatPaymentForm })
  fiatPaymentForm?: FiatPaymentForm;

  @ApiPropertyOptional({ type: () => CryptoPaymentResult })
  cryptoPayment?: CryptoPaymentResult;
}
