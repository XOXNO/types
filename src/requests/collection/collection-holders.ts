export class CollectionHoldersSummary {
  totalSupply = 0;
  onMarket: HolderTypeStats = {
    count: 0,
    weight: 0,
  };
  staked: HolderTypeStats = {
    count: 0,
    weight: 0,
  };
  otherSCs: HolderTypeStats = {
    count: 0,
    weight: 0,
  };
  burnWallet: HolderTypeStats = {
    count: 0,
    weight: 0,
  };
  uniqueHolders: HolderTypeStats = {
    count: 0,
    weight: 0,
  };
  holded: HolderAvgTypeStats = {
    count: 0,
    weight: 0,
    avgPerHodler: 0,
  };
  walletDetails: HolderDetails[] = [];
}

interface HolderTypeStats {
  count: number;
  weight: number;
}

interface HolderAvgTypeStats extends HolderTypeStats {
  avgPerHodler: number;
}
export interface HolderDetails {
  count: number;
  weight: number;
  address: string;
  username: string;
  type: string;
}
