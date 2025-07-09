export interface UserDataSearchResult {
  address: string;
  herotag: null | string;
  description: string;
  isBanned: boolean;
  isVerified: boolean;
  profile: string;
  banner: string;
  joinedDate: number;
  followCount: null | number;
  isCreator: boolean;
  creatorInfo: null | {
    contractAddress: string;
    name: string;
    creatorTag: string;
    description: string;
    joinedDate: number;
    profile: string;
    banner: string;
  };
}
