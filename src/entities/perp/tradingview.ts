import { ApiProperty } from '@nestjs/swagger';
import {
  PerpAssetExchange,
  PerpAssetIntervals,
  PerpAssetSession,
  PerpAssetTimezone,
} from '../../enums';

export class ExchangeDto {
  @ApiProperty({ example: 'BINANCE', description: 'Exchange code identifier' })
  value!: string;

  @ApiProperty({ example: 'Binance', description: 'Exchange display name' })
  name!: string;

  @ApiProperty({
    example: 'Binance Cryptocurrency Exchange',
    description: 'Exchange description',
  })
  desc!: string;
}

export class SymbolTypeDto {
  @ApiProperty({ example: 'Crypto', description: 'Symbol type display name' })
  name!: string;

  @ApiProperty({
    example: 'crypto',
    description: 'Symbol type value identifier',
  })
  value!: string;
}

export class DatafeedConfigurationDto {
  @ApiProperty({
    example: true,
    description: 'Whether the datafeed supports symbol search',
  })
  supports_search!: boolean;

  @ApiProperty({
    example: false,
    description:
      'Whether the datafeed supports grouped symbol requests (legacy)',
  })
  supports_group_request!: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether the datafeed supports chart marks',
  })
  supports_marks!: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether the datafeed supports time-scale marks',
  })
  supports_timescale_marks!: boolean;

  @ApiProperty({
    example: true,
    description: 'Whether the datafeed provides server time',
  })
  supports_time!: boolean;

  @ApiProperty({
    example: ['1', '5', '15', '60', '1D', '1W', '1M'],
    description: 'List of supported resolutions',
    isArray: true,
  })
  supported_resolutions!: PerpAssetIntervals[];

  @ApiProperty({
    type: [ExchangeDto],
    description: 'Available exchanges for the datafeed',
  })
  exchanges!: ExchangeDto[];

  @ApiProperty({
    type: [SymbolTypeDto],
    description: 'Available symbol types (e.g. crypto, stock, futures)',
  })
  symbols_types!: SymbolTypeDto[];
}

export class SymbolInfoDto {
  @ApiProperty({ example: 'BTCUSDT', description: 'Unique symbol name' })
  name!: string;

  @ApiProperty({ example: 'BTCUSDT', description: 'Symbol ticker identifier' })
  ticker!: string;

  @ApiProperty({
    example: 'Bitcoin / Tether',
    description: 'Symbol description',
  })
  description!: string;

  @ApiProperty({
    example: 'crypto',
    description: 'Symbol type (crypto, stock, etc.)',
  })
  type!: string;

  @ApiProperty({ example: '24x7', description: 'Trading session hours' })
  session!: PerpAssetSession;

  @ApiProperty({ example: 'Etc/UTC', description: 'Timezone for this symbol' })
  timezone!: PerpAssetTimezone;

  @ApiProperty({ example: 'BINANCE', description: 'Exchange name or code' })
  exchange!: PerpAssetExchange;

  @ApiProperty({
    example: 1,
    description: 'Minimal price movement (tick size multiplier)',
  })
  minmov!: number;

  @ApiProperty({
    example: 100,
    description: 'Price scale factor (e.g. 100 = 2 decimal places)',
  })
  pricescale!: number;

  @ApiProperty({
    example: true,
    description: 'Whether intraday resolutions are supported',
  })
  has_intraday!: boolean;

  @ApiProperty({
    example: ['1', '5', '15', '60', '1D'],
    description: 'Resolutions supported for this symbol',
    isArray: true,
  })
  supported_resolutions!: PerpAssetIntervals[];

  @ApiProperty({ example: 2, description: 'Precision of volume values' })
  volume_precision!: number;

  @ApiProperty({
    example: 'streaming',
    enum: ['streaming', 'endofday', 'pulsed', 'delayed_streaming'],
    description: 'Data status mode of the feed',
  })
  data_status!: 'streaming' | 'endofday' | 'pulsed' | 'delayed_streaming';
}

export class PeriodParamsDto {
  @ApiProperty({
    example: 1730342400,
    description: 'Start of requested period (Unix timestamp, seconds)',
  })
  from!: number;

  @ApiProperty({
    example: 1730428800,
    description: 'End of requested period (Unix timestamp, seconds)',
  })
  to!: number;

  @ApiProperty({ example: 500, description: 'Number of bars requested' })
  countBack!: number;

  @ApiProperty({
    example: true,
    description: 'Whether this is the first data request (initial load)',
  })
  firstDataRequest!: boolean;
}

export class BarDto {
  @ApiProperty({
    example: 1730428800000,
    description: 'Unix timestamp in milliseconds',
  })
  time!: number;

  @ApiProperty({ example: 35000, description: 'Open price of the bar' })
  open!: number;

  @ApiProperty({ example: 35100, description: 'High price of the bar' })
  high!: number;

  @ApiProperty({ example: 34900, description: 'Low price of the bar' })
  low!: number;

  @ApiProperty({ example: 35050, description: 'Close price of the bar' })
  close!: number;

  @ApiProperty({ example: 125.34, description: 'Trading volume for the bar' })
  volume!: number;
}
