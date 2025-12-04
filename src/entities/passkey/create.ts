import { ContractSignatureType } from '../../enums/passkey.enum';

export type ContractSignatureRequestPasskey = {
  type: ContractSignatureType.PASSKEY;

  signature: string;

  authenticatorData: string;

  id: string;
};

export type ContractSignatureRequestWallet = {
  type:
    | ContractSignatureType.EVM
    | ContractSignatureType.MVX
    | ContractSignatureType.SOL;

  signature: string;
};

export type ContractSignatureRequest =
  | ContractSignatureRequestPasskey
  | ContractSignatureRequestWallet;

export type SignatureRequestWallet = ContractSignatureRequestWallet & {
  message: string;
};
