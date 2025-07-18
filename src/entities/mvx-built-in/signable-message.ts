/* eslint-disable @typescript-eslint/no-explicit-any */

export class SignableMessage {
  private readonly message!:
    | ArrayBuffer
    | { valueOf(): ArrayBuffer | SharedArrayBuffer }
    | Buffer;
  public signature!: any;

  constructor(init: any) {
    this.message = Buffer.from([]);
    Object.assign(this, init);
  }

  serializeForSigning() {
    const messageSize = Buffer.from(this.message);
    return messageSize;
  }

  getSignature() {
    return this.signature;
  }
  applySignature(signature: any) {
    this.signature = signature;
  }
}
