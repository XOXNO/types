import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

/**
 * On-chain venue tag for a single hop. Matches the Soroban
 * `SwapVenue` enum in `stellar-router-contract/src/types.rs` and
 * `rs-lending-xlm/common/src/types.rs`.
 */
export const SWAP_VENUES = [
  'Soroswap',
  'Aquarius',
  'Phoenix',
  'Sushi',
  'CometDex',
] as const;
export type SwapVenue = (typeof SWAP_VENUES)[number];

/**
 * Single hop in an aggregator path. Field names use camelCase on the
 * wire; the SDK encoder rewrites them to snake_case (`amount_out`, `pool`,
 * `token_in`, `token_out`, `venue`) when building the Soroban XDR so
 * the bytes match the on-chain `SwapHop` struct exactly.
 */
export class SwapHopDto {
  @ApiProperty({
    description:
      'Expected output of this hop in raw token units (i128 decimal string). The router uses it as the venue-specific swap limit/hint.',
    example: '6679778663',
  })
  @IsString()
  amountOut!: string;

  @ApiProperty({
    description:
      'Soroban pool contract address for the venue executing this hop.',
    example: 'CATK7WRKPAMZKSTNZJ5J6MT7Q7I3DLYEBIAB4CA6Z6SY6LAD2ASQOHNN',
  })
  @IsString()
  pool!: string;

  @ApiProperty({
    description: 'Soroban Asset Contract address of the input token.',
    example: 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC',
  })
  @IsString()
  tokenIn!: string;

  @ApiProperty({
    description: 'Soroban Asset Contract address of the output token.',
    example: 'CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA',
  })
  @IsString()
  tokenOut!: string;

  @ApiProperty({
    description: 'Which DEX/venue routes this hop.',
    enum: SWAP_VENUES,
    example: 'Soroswap',
  })
  @IsIn(SWAP_VENUES)
  venue!: SwapVenue;
}

/**
 * One path in a (possibly multi-path) aggregator swap.
 *
 * `splitPpm` is parts-per-million of the batch's total input allocated
 * to this path. The router computes the input for each path from
 * `totalIn` and the ppm split; the last path absorbs PPM rounding. Within
 * a path, output of hop N feeds hop N+1 directly. The single
 * `totalMinOut` guard at the payload level is the final slippage gate.
 */
export class SwapPathDto {
  @ApiProperty({
    description:
      'Sequential hops executed within this path. Output of hop N flows directly into hop N+1.',
    type: () => SwapHopDto,
    isArray: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SwapHopDto)
  hops!: SwapHopDto[];

  @ApiProperty({
    description:
      'Parts per million (ppm) of the batch total input to route through this path. Must be > 0; sum of all paths must equal 1_000_000.',
    example: 1_000_000,
  })
  @IsInt()
  @Min(1)
  @Max(1_000_000)
  splitPpm!: number;
}

/**
 * Full payload encoded into `routeXdr` for the aggregator router's
 * `execute_strategy(sender, total_in, swap_xdr)` entry point.
 *
 * Lending controllers receive the encoded bytes as an opaque `Bytes` value
 * and forward them to the aggregator; they do not decode this struct.
 */
export class StrategyPayloadDto {
  @ApiProperty({
    description: 'Parallel paths to execute. Length >= 1.',
    type: () => SwapPathDto,
    isArray: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SwapPathDto)
  paths!: SwapPathDto[];

  @ApiProperty({
    description:
      'Referral identifier. `0` (or omitted) means no referral and no fee. Non-zero IDs must be registered on-chain via `add_referral` or the router rejects execution.',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  referralId?: number;

  @ApiProperty({
    description: 'Soroban Asset Contract address of the input token.',
    example: 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC',
  })
  @IsString()
  tokenIn!: string;

  @ApiProperty({
    description: 'Soroban Asset Contract address of the output token.',
    example: 'CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA',
  })
  @IsString()
  tokenOut!: string;

  @ApiProperty({
    description:
      "Aggregate slippage guard across all paths' final output token (i128 decimal string). Must be > 0.",
    example: '6679778663',
  })
  @IsString()
  totalMinOut!: string;
}

/**
 * Opaque strategy swap payload as returned by the quote server. `routeXdr`
 * is the base64 ScVal XDR for `StrategyPayloadDto`; callers pass the
 * decoded bytes to `execute_strategy` or to a lending strategy method.
 */
export class StrategySwapDto {
  @ApiProperty({
    description:
      'Base64 ScVal XDR of `StrategyPayloadDto`, passed as Soroban `Bytes` to `execute_strategy(sender, total_in, swap_xdr)`.',
    example: 'AAAA...',
  })
  @IsString()
  routeXdr!: string;
}

/**
 * @deprecated Use `StrategyPayloadDto` for decoded payloads or
 * `StrategySwapDto.routeXdr` for the executable opaque bytes.
 */
export class AggregatorSwapDto extends StrategyPayloadDto {}

/**
 * @deprecated The current router no longer exposes `batch_execute`.
 * Use `execute_strategy(sender, total_in, swap_xdr)` with
 * `StrategySwapDto.routeXdr`.
 */
export class BatchSwapDto extends StrategyPayloadDto {
  @ApiProperty({
    description:
      'Deprecated. `execute_strategy` takes the sender as a separate argument.',
    example: 'GDBBOILYIJBSUQKC3Z3USAW3DGPFHIGVKYA5T4ZUZBO56HBUPHJEN3FV',
    required: false,
  })
  @IsOptional()
  @IsString()
  sender?: string;

  @ApiProperty({
    description:
      'Deprecated. `execute_strategy` takes the total input as a separate argument.',
    example: '1000000000',
    required: false,
  })
  @IsOptional()
  @IsString()
  totalIn?: string;
}

/**
 * Execution-plane filter for the quote server.
 *   - `aggregator` (default): Soroban venues only (Soroswap, Aquarius,
 *     Phoenix, Sushi, CometDex). Produces a `routeXdr` payload and,
 *     when requested, an `execute_strategy` envelope.
 *   - `sdex`: Stellar DEX (native AMM) only.
 *   - `all`: runs both planes and returns the winner with the runner-up
 *     attached as an alternative.
 */
export const STELLAR_QUOTE_PLATFORMS = ['aggregator', 'sdex', 'all'] as const;
export type StellarQuotePlatform = (typeof STELLAR_QUOTE_PLATFORMS)[number];

/**
 * Token family resolved by the quote server\'s tokens endpoint.
 *   - `native`: Stellar native lumens (XLM).
 *   - `classic`: Stellar Classic asset (`CODE:GISSUER`).
 *   - `soroban`: Soroban asset contract (`C…`).
 */
export type StellarTokenKind = 'native' | 'classic' | 'soroban';

/**
 * Query parameters for `GET /api/v1/quote` on the Stellar quote server.
 *
 * Exactly one of `amountIn` or `amountOut` must be provided. The response
 * includes `routeXdr` for the Soroban-only aggregator route. `router`
 * + `sender` together populate `transaction.envelopeXdr` with a
 * ready-to-sign `execute_strategy` envelope.
 */
export class StellarAggregatorQuoteRequestDto {
  @ApiProperty({
    description:
      'Input token. Accepts: `XLM`/`native`, `CODE` (first matching Classic), `CODE-SAC`, `XLM-SAC`, `CODE:GISSUER…`, or `C…` (56-char Soroban contract address).',
    example: 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC',
  })
  @IsString()
  from!: string;

  @ApiProperty({
    description: 'Output token (same accepted forms as `from`).',
    example: 'CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA',
  })
  @IsString()
  to!: string;

  @ApiProperty({
    description:
      'Forward mode: input amount in raw atomic units (i128 decimal string). Mutually exclusive with `amountOut`.',
    required: false,
    example: '1000000000',
  })
  @IsOptional()
  @IsString()
  amountIn?: string;

  @ApiProperty({
    description:
      'Reverse mode: target output in raw atomic units. Server computes the minimum input that delivers at least this output.',
    required: false,
  })
  @IsOptional()
  @IsString()
  amountOut?: string;

  @ApiProperty({
    description:
      "Maximum hops per path. Defaults to the server's built-in cap.",
    required: false,
    example: 4,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxHops?: number;

  @ApiProperty({
    description:
      'Maximum number of parallel paths the allocator may produce. Default 1 (no split).',
    required: false,
    example: 4,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxSplits?: number;

  @ApiProperty({
    description:
      'Slippage tolerance as a decimal (e.g. 0.01 = 1%). When set, the response populates `amountOutMin` at `amountOut * (1 - slippage)`.',
    required: false,
    example: 0.01,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  slippage?: number;

  @ApiProperty({
    description:
      'Force `paths[]` in the response even for single-path quotes. Mirrors MVX `includePaths=true` convention.',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  includePaths?: boolean;

  @ApiProperty({
    description:
      'Sender G-strkey. When combined with `router`, the response contains `transaction.envelopeXdr` (an unsigned envelope ready to sign + submit).',
    required: false,
    example: 'GDBBOILYIJBSUQKC3Z3USAW3DGPFHIGVKYA5T4ZUZBO56HBUPHJEN3FV',
  })
  @IsOptional()
  @IsString()
  sender?: string;

  @ApiProperty({
    description: 'Aggregator router C-strkey for envelope construction.',
    required: false,
    example: 'CDH6RRN5P6KUAMMTR3TKSX36PZTHMOIG3M3WWEGU2G5GSSSEAYTRU4OK',
  })
  @IsOptional()
  @IsString()
  router?: string;

  @ApiProperty({
    description:
      'Referral identifier embedded into the envelope. `0` (default) means no referral / no fee. Non-zero IDs must be registered on-chain via `add_referral` or the contract reverts.',
    required: false,
    example: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  referralId?: number;

  @ApiProperty({
    description: 'Execution-plane filter.',
    enum: STELLAR_QUOTE_PLATFORMS,
    required: false,
    example: 'aggregator',
  })
  @IsOptional()
  @IsIn(STELLAR_QUOTE_PLATFORMS)
  platform?: StellarQuotePlatform;

  @ApiProperty({
    description:
      'Reject the quote with HTTP 409 if the indexer snapshot is more than one ledger behind the live network. Costs one extra RPC round-trip.',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  fresh?: boolean;
}

/**
 * Single hop entry on the quote response. The shape is wider than
 * `SwapHopDto` because the server also returns metadata (`dex`, `kind`,
 * `amountIn`/`amountOut` per hop, decimal-shifted display amounts) that
 * the UI needs but the on-chain payload does not. The mapping
 * quote-hop → contract-hop is:
 *
 * ```
 * { amountOut → amountOut, address → pool, from → tokenIn, to → tokenOut, dex → venue }
 * ```
 */
export class StellarQuoteSwapHopDto {
  @ApiProperty({
    description: 'Venue label. One of the `SwapVenue` variants.',
    enum: SWAP_VENUES,
    example: 'Soroswap',
  })
  @IsIn(SWAP_VENUES)
  dex!: SwapVenue;

  @ApiProperty({
    description: 'Pool shape: `ConstantProduct` | `Stable` | `Static`.',
    example: 'ConstantProduct',
  })
  @IsString()
  kind!: string;

  @ApiProperty({
    description:
      'Canonical pool identifier. For aggregator routes this is always a Soroban pool C-strkey. Field name `address` mirrors MVX QuoteSwapResponse exactly so chain-agnostic clients can iterate hops without branching on chain.',
  })
  @IsString()
  address!: string;

  @ApiProperty({ description: 'Pool fee in basis points.', example: 30 })
  @IsInt()
  @Min(0)
  feeBps!: number;

  @ApiProperty({ description: 'Input token canonical id.' })
  @IsString()
  from!: string;

  @ApiProperty({
    description: 'Token family of the input token.',
    enum: ['native', 'classic', 'soroban'],
  })
  @IsIn(['native', 'classic', 'soroban'])
  tokenInKind!: StellarTokenKind;

  @ApiProperty({ description: 'Output token canonical id.' })
  @IsString()
  to!: string;

  @ApiProperty({
    description: 'Token family of the output token.',
    enum: ['native', 'classic', 'soroban'],
  })
  @IsIn(['native', 'classic', 'soroban'])
  tokenOutKind!: StellarTokenKind;

  @ApiProperty({ description: 'Input amount on this hop (i128 string).' })
  @IsString()
  amountIn!: string;

  @ApiProperty({ description: 'Output amount on this hop (i128 string).' })
  @IsString()
  amountOut!: string;

  @ApiProperty({
    description:
      'Display input amount (decimals applied; loses precision above 2^53).',
  })
  @IsNumber()
  amountInShort!: number;

  @ApiProperty({ description: 'Display output amount.' })
  @IsNumber()
  amountOutShort!: number;
}

/**
 * Single allocated path in the quote response. Maps to `SwapPathDto`
 * (with field renames) when constructing a decoded strategy payload.
 */
export class StellarQuotePathDto {
  @ApiProperty({ description: 'Input amount routed through this path.' })
  @IsString()
  amountIn!: string;

  @ApiProperty({ description: 'Output amount produced by this path.' })
  @IsString()
  amountOut!: string;

  @ApiProperty({ description: 'Display input amount.' })
  @IsNumber()
  amountInShort!: number;

  @ApiProperty({ description: 'Display output amount.' })
  @IsNumber()
  amountOutShort!: number;

  @ApiProperty({
    description:
      'Parts-per-million of total input routed through this path. 1_000_000 = 100%.',
    example: 1_000_000,
  })
  @IsInt()
  @Min(0)
  splitPpm!: number;

  @ApiProperty({ type: () => StellarQuoteSwapHopDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => StellarQuoteSwapHopDto)
  swaps!: StellarQuoteSwapHopDto[];
}

/**
 * Unsigned Soroban transaction envelope returned when the quote request
 * supplied both `sender` and `router`. It invokes
 * `execute_strategy(sender, total_in, swap_xdr)`. The caller MUST:
 *   1. Populate `seqNum` from the sender\'s account state.
 *   2. Run `simulateTransaction` to attach Soroban resource fees.
 *   3. Sign with the sender\'s key (Ed25519 / Stellar Wallets Kit).
 *   4. Submit via `sendTransaction`.
 */
export class StellarQuoteTransactionPayloadDto {
  @ApiProperty({ description: 'Base64 XDR of the unsigned envelope.' })
  @IsString()
  envelopeXdr!: string;

  @ApiProperty({ description: 'Sender G-strkey (echo of request).' })
  @IsString()
  sourceAccount!: string;

  @ApiProperty({ description: 'Router contract C-strkey (echo of request).' })
  @IsString()
  routerContract!: string;

  @ApiProperty({
    description:
      'Placeholder base fee in stroops; caller adjusts post-simulation.',
  })
  @IsInt()
  @Min(0)
  baseFee!: number;

  @ApiProperty({ description: 'Network passphrase the envelope is tied to.' })
  @IsString()
  networkPassphrase!: string;

  @ApiProperty({ description: 'Human-readable pre-signing checklist.' })
  @IsString()
  notes!: string;
}

/**
 * Side-by-side comparison entry attached when `platform=all` is
 * requested. Always a different `platform` value than the parent
 * response; nesting is one level deep by construction.
 */
export class StellarQuoteAlternativeDto {
  @ApiProperty({
    description: 'Platform that produced this alternative.',
    enum: STELLAR_QUOTE_PLATFORMS,
  })
  @IsIn(STELLAR_QUOTE_PLATFORMS)
  platform!: StellarQuotePlatform;

  @ApiProperty({
    description:
      'Full alternative quote. Its own `alternatives` field is always omitted.',
    type: () => StellarAggregatorQuoteResponseDto,
  })
  @ValidateNested()
  @Type(() => StellarAggregatorQuoteResponseDto)
  quote!: Omit<StellarAggregatorQuoteResponseDto, 'alternatives'>;
}

/**
 * Response DTO for `GET /api/v1/quote` on the Stellar quote server.
 * Mirrors the Rust `QuoteResponse` in
 * `arb-algo/stellar-indexer/src/quote/types.rs` exactly.
 */
export class StellarAggregatorQuoteResponseDto {
  @ApiProperty({ enum: ['forward', 'reverse'] })
  @IsIn(['forward', 'reverse'])
  mode!: 'forward' | 'reverse';

  @ApiProperty({ description: 'Input token canonical id.' })
  @IsString()
  from!: string;

  @ApiProperty({ enum: ['native', 'classic', 'soroban'] })
  @IsIn(['native', 'classic', 'soroban'])
  tokenInKind!: StellarTokenKind;

  @ApiProperty({ description: 'Output token canonical id.' })
  @IsString()
  to!: string;

  @ApiProperty({ enum: ['native', 'classic', 'soroban'] })
  @IsIn(['native', 'classic', 'soroban'])
  tokenOutKind!: StellarTokenKind;

  @ApiProperty({ description: 'Input amount (i128 string).' })
  @IsString()
  amountIn!: string;

  @ApiProperty({ description: 'Output amount (i128 string).' })
  @IsString()
  amountOut!: string;

  @ApiProperty({ description: 'Display input amount.' })
  @IsNumber()
  amountInShort!: number;

  @ApiProperty({ description: 'Display output amount.' })
  @IsNumber()
  amountOutShort!: number;

  @ApiProperty({
    description: 'Minimum output after slippage (i128 string).',
    required: false,
  })
  @IsOptional()
  @IsString()
  amountOutMin?: string;

  @ApiProperty({ description: 'Display min-out.', required: false })
  @IsOptional()
  @IsNumber()
  amountOutMinShort?: number;

  @ApiProperty({
    description: 'Slippage tolerance echoed from the request.',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  slippage?: number;

  @ApiProperty({
    description:
      'Price impact as a decimal: `1 - executed_rate / spot_rate`. Absent when spot rate cannot be determined.',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  priceImpact?: number;

  @ApiProperty({
    description:
      'Base64 ScVal XDR of `StrategyPayloadDto`. Decode it to bytes and pass it as `swap_xdr` to `execute_strategy`, or forward it as opaque strategy bytes to lending controllers.',
    required: false,
  })
  @IsOptional()
  @IsString()
  routeXdr?: string;

  @ApiProperty({ description: 'Output per 1 unit of input.' })
  @IsNumber()
  rate!: number;

  @ApiProperty({ description: 'Input per 1 unit of output.' })
  @IsNumber()
  rateInverse!: number;

  @ApiProperty({ description: 'Decimals of the input token.', example: 7 })
  @IsInt()
  @Min(0)
  decimalsIn!: number;

  @ApiProperty({ description: 'Decimals of the output token.', example: 7 })
  @IsInt()
  @Min(0)
  decimalsOut!: number;

  @ApiProperty({
    description:
      'Flat hop list (concatenation of all paths when split). Useful for compact UI display.',
    type: () => StellarQuoteSwapHopDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StellarQuoteSwapHopDto)
  hops!: StellarQuoteSwapHopDto[];

  @ApiProperty({
    description:
      'Per-path breakdown. Populated when the allocator produced more than one path OR when `includePaths=true` was passed.',
    required: false,
    type: () => StellarQuotePathDto,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StellarQuotePathDto)
  paths?: StellarQuotePathDto[];

  @ApiProperty({
    description:
      'Unsigned envelope ready to sign + submit. Populated when both `sender` and `router` query params were provided.',
    required: false,
    type: () => StellarQuoteTransactionPayloadDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => StellarQuoteTransactionPayloadDto)
  transaction?: StellarQuoteTransactionPayloadDto;

  @ApiProperty({
    description: 'Execution plane that produced this quote.',
    enum: STELLAR_QUOTE_PLATFORMS,
  })
  @IsIn(STELLAR_QUOTE_PLATFORMS)
  platform!: StellarQuotePlatform;

  @ApiProperty({
    description:
      'Side-by-side comparison. Populated only when `platform=all` was requested AND a non-winning platform produced a quote.',
    required: false,
    type: () => StellarQuoteAlternativeDto,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StellarQuoteAlternativeDto)
  alternatives?: StellarQuoteAlternativeDto[];

  @ApiProperty({
    description:
      'Combined static + referral fee in basis points (1 bps = 0.01%) the router will charge for this swap. Absent when `referralId == 0` (no fee — matches rs-aggregator MVX semantics).',
    required: false,
    example: 30,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  feeBps?: number;

  @ApiProperty({
    description:
      'Fee amount the router will deduct (i128 string). Charged on the input token when `feeOnInput=true`, otherwise on the output token. The `amountOut` / `amountOutMin` fields already reflect this deduction.',
    required: false,
  })
  @IsOptional()
  @IsString()
  feeAmount?: string;

  @ApiProperty({
    description:
      'Display value of `feeAmount` (decimals applied; loses precision above 2^53).',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  feeAmountShort?: number;

  @ApiProperty({
    description:
      "`true` if the fee is charged on the input token, `false` if charged on the output. Mirrors the contract's `fee_on_input = !out_whitelisted || in_whitelisted` rule.",
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  feeOnInput?: boolean;

  @ApiProperty({
    description:
      'USD value of `amountIn`. Absent when the input token has no Reflector oracle price on the active network.',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  amountInUsd?: number;

  @ApiProperty({
    description: 'USD value of `amountOut`.',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  amountOutUsd?: number;

  @ApiProperty({
    description:
      'USD value of `amountOutMin` (only set when `slippage` was requested and the output token has a price).',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  amountOutMinUsd?: number;
}
