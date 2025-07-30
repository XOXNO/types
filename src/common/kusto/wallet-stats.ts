import { ApiProperty } from '@nestjs/swagger';
import { ActivityChain } from '../../enums/common.enum';

export class PriceData {
  @ApiProperty({
    description: 'Price of the NFT in native token',
    example: 10.5,
    type: Number,
  })
  price!: number;
  @ApiProperty({
    description: 'USD value of the NFT at the time of transaction',
    example: 525.0,
    type: Number,
  })
  usdValue!: number;
  @ApiProperty({
    description: 'Unix timestamp of the transaction',
    example: 1672531200,
    type: Number,
  })
  timestamp!: number;
  @ApiProperty({
    description: 'NFT identifier',
    example: 'COOL-1a2b3c-01',
    type: String,
  })
  identifier!: string;
  @ApiProperty({
    description: 'Transaction hash',
    example: '0xabcdef123456789',
    type: String,
  })
  txHash!: string;
}

export class WalletTradingStats {
  @ApiProperty({
    description: 'Wallet address',
    example: 'erd1qqqqqqqqqqqqqpgqa0fsfshnff4n76jhcye6k7uvd7qacsq42jpsp6shh2',
    type: String,
  })
  wallet!: string;
  @ApiProperty({
    description: 'Total trading volume in native token',
    example: 1500.5,
    type: Number,
  })
  totalVolume!: number;
  @ApiProperty({
    description: 'Total number of trades executed',
    example: 250,
    type: Number,
  })
  totalTrades!: number;
  @ApiProperty({
    description: 'Total number of unique collections traded',
    example: 45,
    type: Number,
  })
  totalCollections!: number;
  @ApiProperty({
    description: 'Total number of unique NFTs traded',
    example: 125,
    type: Number,
  })
  totalNfts!: number;
  @ApiProperty({
    description: 'Total number of unique trading partners',
    example: 80,
    type: Number,
  })
  totalPartners!: number;
  @ApiProperty({
    description: 'Total volume spent as buyer in native token',
    example: 800.25,
    type: Number,
  })
  buyerVolume!: number;
  @ApiProperty({
    description: 'Total number of buy trades',
    example: 120,
    type: Number,
  })
  buyerTrades!: number;
  @ApiProperty({
    description: 'Total number of NFTs bought',
    example: 65,
    type: Number,
  })
  buyerNfts!: number;
  @ApiProperty({
    description: 'Total number of collections bought from',
    example: 25,
    type: Number,
  })
  buyerCollections!: number;
  @ApiProperty({
    description: 'Total number of unique sellers',
    example: 40,
    type: Number,
  })
  buyerPartners!: number;
  @ApiProperty({
    description: 'Maximum price paid for an NFT',
    example: 150.0,
    type: Number,
  })
  buyerMaxPrice!: number;
  @ApiProperty({
    description: 'Minimum price paid for an NFT',
    example: 0.5,
    type: Number,
  })
  buyerMinPrice!: number;
  @ApiProperty({
    description: 'Details of the highest priced purchase',
    type: PriceData,
    nullable: true,
  })
  buyerMaxPriceData!: PriceData | null;
  @ApiProperty({
    description: 'Details of the lowest priced purchase',
    type: PriceData,
    nullable: true,
  })
  buyerMinPriceData!: PriceData | null;
  @ApiProperty({
    description: 'Total volume earned as seller in native token',
    example: 700.25,
    type: Number,
  })
  sellerVolume!: number;
  @ApiProperty({
    description: 'Total number of sell trades',
    example: 130,
    type: Number,
  })
  sellerTrades!: number;
  @ApiProperty({
    description: 'Total number of NFTs sold',
    example: 60,
    type: Number,
  })
  sellerNfts!: number;
  @ApiProperty({
    description: 'Total number of collections sold from',
    example: 20,
    type: Number,
  })
  sellerCollections!: number;
  @ApiProperty({
    description: 'Total number of unique buyers',
    example: 40,
    type: Number,
  })
  sellerPartners!: number;
  @ApiProperty({
    description: 'Maximum price received for an NFT sale',
    example: 200.0,
    type: Number,
  })
  sellerMaxPrice!: number;
  @ApiProperty({
    description: 'Minimum price received for an NFT sale',
    example: 1.0,
    type: Number,
  })
  sellerMinPrice!: number;
  @ApiProperty({
    description: 'Details of the highest priced sale',
    type: PriceData,
    nullable: true,
  })
  sellerMaxPriceData!: PriceData | null;
  @ApiProperty({
    description: 'Details of the lowest priced sale',
    type: PriceData,
    nullable: true,
  })
  sellerMinPriceData!: PriceData | null;
  @ApiProperty({
    description: 'Blockchain network for these statistics',
    enum: ActivityChain,
    example: ActivityChain.MVX,
  })
  chain!: ActivityChain;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.wallet = data.Address;
    this.totalVolume = data.TotalVolume;
    this.totalTrades = data.TotalTrades;
    this.totalCollections = data.TotalCollections;
    this.totalNfts = data.TotalNfts;
    this.totalPartners = data.TotalPartners;
    this.buyerVolume = data.BuyerVolume;
    this.buyerTrades = data.BuyerTrades;
    this.buyerNfts = data.BuyerNfts;
    this.buyerCollections = data.BuyerCollections;
    this.buyerPartners = data.BuyerPartners;
    this.buyerMaxPriceData =
      data.BuyerMaxPriceData !== null
        ? {
            price: data.BuyerMaxPriceData?.Price ?? null,
            timestamp: data.BuyerMaxPriceData?.Timestamp ?? null,
            identifier: data.BuyerMaxPriceData?.Identifier ?? null,
            txHash: data.BuyerMaxPriceData?.TxHash ?? null,
            usdValue: data.BuyerMaxPriceData?.UsdValue ?? null,
          }
        : null;
    this.buyerMinPriceData =
      data.BuyerMinPriceData !== null
        ? {
            price: data.BuyerMinPriceData?.Price ?? null,
            timestamp: data.BuyerMinPriceData?.Timestamp ?? null,
            identifier: data.BuyerMinPriceData?.Identifier ?? null,
            txHash: data.BuyerMinPriceData?.TxHash ?? null,
            usdValue: data.BuyerMinPriceData?.UsdValue ?? null,
          }
        : null;
    this.sellerVolume = data.SellerVolume;
    this.sellerTrades = data.SellerTrades;
    this.sellerNfts = data.SellerNfts;
    this.sellerCollections = data.SellerCollections;
    this.sellerPartners = data.SellerPartners;
    this.sellerMaxPriceData =
      data.SellerMaxPriceData !== null
        ? {
            price: data.SellerMaxPriceData?.Price ?? null,
            timestamp: data.SellerMaxPriceData?.Timestamp ?? null,
            identifier: data.SellerMaxPriceData?.Identifier ?? null,
            txHash: data.SellerMaxPriceData?.TxHash ?? null,
            usdValue: data.SellerMaxPriceData?.UsdValue ?? null,
          }
        : null;
    this.sellerMinPriceData =
      data.SellerMinPriceData !== null
        ? {
            price: data.SellerMinPriceData?.Price ?? null,
            timestamp: data.SellerMinPriceData?.Timestamp ?? null,
            identifier: data.SellerMinPriceData?.Identifier ?? null,
            txHash: data.SellerMinPriceData?.TxHash ?? null,
            usdValue: data.SellerMinPriceData?.UsdValue ?? null,
          }
        : null;
    this.chain = data.chain ?? ActivityChain.MVX;
  }
}
