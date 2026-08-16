import { ApiProperty } from '@nestjs/swagger';

/**
 * Stellar lending launch-campaign leaderboard DTOs, mirrored from
 * `xoxno-api-v2 src/endpoints/stellar-lending/dto/campaign.dto.ts` so the
 * generated SDK client can import them from `@xoxno/types`.
 */

export class StellarCampaignQuestsDto {
  @ApiProperty() supply!: boolean;
  @ApiProperty() borrow!: boolean;
  @ApiProperty() multiply!: boolean;
  @ApiProperty() swapCollateral!: boolean;
  @ApiProperty() swapDebt!: boolean;
  @ApiProperty() repayCollateral!: boolean;
  @ApiProperty() migrate!: boolean;
}

export class StellarCampaignRowDto {
  @ApiProperty({ description: '1-based rank among all scorers.' })
  rank!: number;

  @ApiProperty({
    description: 'Wallet (Owner). Empty Owner falls back to AccountId.',
  })
  owner!: string;

  @ApiProperty({ description: 'Campaign points (USD-days + quests).' })
  score!: number;

  @ApiProperty({
    description: 'Haircut equity USD-days (max(supply-borrow, 0)).',
  })
  twEquity!: number;

  @ApiProperty({ description: 'Borrow USD-days, capped at 3x equity.' })
  twBorrow!: number;

  @ApiProperty({
    description:
      'Estimated prize-pool share (1e6 units proportional to score).',
  })
  allocation!: number;

  @ApiProperty() questsCompleted!: number;
  @ApiProperty() questsTotal!: number;

  @ApiProperty({ type: StellarCampaignQuestsDto })
  quests!: StellarCampaignQuestsDto;

  @ApiProperty({ required: false, nullable: true })
  firstMigrateAt?: string | null;

  @ApiProperty() accounts!: number;
}

export class StellarCampaignLeaderboardDto {
  @ApiProperty({ type: [StellarCampaignRowDto] })
  rows!: StellarCampaignRowDto[];

  @ApiProperty() campaignStart!: string;
  @ApiProperty() campaignEnd!: string;
  @ApiProperty() prizePool!: number;
}

export class StellarCampaignMeDto extends StellarCampaignRowDto {
  @ApiProperty() campaignStart!: string;
  @ApiProperty() campaignEnd!: string;
  @ApiProperty() prizePool!: number;
}
