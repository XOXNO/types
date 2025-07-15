import { SuccessDto } from '../../cosmos-db/documents/chat/block-user.dto';

export class SuccessWithMessageDto extends SuccessDto {
  message!: string;
}
