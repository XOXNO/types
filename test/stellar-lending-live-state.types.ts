import { ActivityChain } from '../dist/enums/index';
import type {
  StellarLendingLiveStateDto,
  StellarMarketIndexByHub,
  StellarSpokeListItem,
} from '../dist/stellar-lending/index';

const index: StellarMarketIndexByHub = {
  hubId: 1,
  asset: 'CUSDC',
  supplyIndex: '1000000000000000000000000000',
  supplyIndexShort: 1,
  borrowIndex: '1000000000000000000000000000',
  borrowIndexShort: 1,
  usdPrice: '1000000000000000000',
  usdPriceShort: 1,
  primaryPriceUsd: '1000000000000000000',
  primaryPriceUsdShort: 1,
  anchorPriceUsd: '1000000000000000000',
  anchorPriceUsdShort: 1,
  chain: ActivityChain.STELLAR,
};

const liveState: StellarLendingLiveStateDto = {
  indexes: [index],
  minBorrowCollateralUsdWad: '1000000000000000000',
};

const spoke: StellarSpokeListItem = {
  spokeId: 2,
  name: 'Main',
  hubId: 1,
  connectedHubIds: [1, 2],
  tvlUsd: 100,
  totalBorrowsUsd: 50,
  assetCount: 2,
};

void [liveState, spoke];
