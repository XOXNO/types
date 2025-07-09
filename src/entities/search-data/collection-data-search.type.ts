import { ActivityChain } from '../../common/enums';

export interface CollectionDataSearchResult {
  collection: string;
  name: string;
  description: string;
  isVisible: boolean;
  isVerified: boolean;
  profile: string;
  banner: string;
  type: string;
  tags: string[];
  nftCount: number;
  followCount: number;
  isMintable: boolean;
  tradeData: null | {
    dayEgldVolume: number;
    weekEgldVolume: number;
    totalEgldVolume: number;
  };
  mintInfo: null | {
    creatorName: string;
    creatorTag: string;
    collectionTag: string;
  };
  floorPrice?: number;
  chain?: ActivityChain;
}
