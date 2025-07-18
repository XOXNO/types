export class MvxGuardianData {
  guarded = false;
  activeGuardian?: Guardian;
  pendingGuardian?: Guardian;

  constructor(init?: Partial<MvxGuardianData>) {
    Object.assign(this, init);
  }
}

class Guardian {
  activationEpoch = 0;
  address = '';
  serviceUID = '';
}
