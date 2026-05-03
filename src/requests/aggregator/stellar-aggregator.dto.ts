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
  'NativeAmm',
  'StaticBridge',
] as const;
export type SwapVenue = (typeof SWAP_VENUES)[number];

/**
 * Single hop in an aggregator path. Field names use camelCase on the
 * wire; the SDK encoder rewrites them to snake_case (`fee_bps`, `pool`,
 * `token_in`, `token_out`, `venue`) when building the Soroban XDR so
 * the bytes match the on-chain `SwapHop` struct exactly.
 */
export class SwapHopDto {
  @ApiProperty({
    description:
      'Pool fee in basis points (1 bps = 0.01%). Informational; the pool has authority over the fee actually applied.',
    example: 30,
  })
  @IsInt()
  @Min(0)
  feeBps!: number;

  @ApiProperty({
    description:
      'Pool contract address (Soroswap/Aquarius/Phoenix), LP account (NativeAmm), or zero bytes (StaticBridge).',
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
 * to this path. The router computes `path_input = totalIn * splitPpm /
 * 1_000_000`; the LAST path absorbs PPM rounding so the entire `totalIn`
 * is consumed and no dust is left on the sender. Within a path, output
 * of hop N feeds hop N+1 directly — there are no per-hop or per-path
 * amount fields. The single `totalMinOut` guard at the batch level is
 * the only slippage gate.
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
 * User-facing aggregator swap request as accepted by the Soroban
 * lending controller's strategy methods (`multiply`, `swap_debt`,
 * `swap_collateral`, `repay_debt_with_collateral`). The controller
 * wraps this in `BatchSwap` (filling `sender = current_contract_address`
 * and `totalIn = actual_withdrawn`) before forwarding to the aggregator
 * router.
 */
export class AggregatorSwapDto {
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
      "Aggregate slippage guard across all paths' final output token (i128 decimal string). Must be > 0.",
    example: '6679778663',
  })
  @IsString()
  totalMinOut!: string;
}

/**
 * Full payload for the aggregator router's `batch_execute` entry point.
 * Identical to `AggregatorSwapDto` plus an explicit `sender` (G or
 * C strkey) whose SAC balance funds the swap (the router pulls
 * `totalIn` once at the start) and receives the output.
 *
 * Lending callers never construct `BatchSwap` directly — the controller
 * fills `sender` with `current_contract_address` and `totalIn` with the
 * authoritative withdrawal delta so user funds remain under the
 * controller's custody for the duration of the strategy.
 */
export class BatchSwapDto {
  @ApiProperty({ type: () => SwapPathDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SwapPathDto)
  paths!: SwapPathDto[];

  @ApiProperty({
    description:
      'Account whose SAC balances fund the swap and receive the output. G-strkey for user-direct swaps, C-strkey when called by another contract.',
    example: 'GDBBOILYIJBSUQKC3Z3USAW3DGPFHIGVKYA5T4ZUZBO56HBUPHJEN3FV',
  })
  @IsString()
  sender!: string;

  @ApiProperty({
    description:
      "Total input amount the router will pull from `sender` once at the start of `batch_execute` (i128 decimal string). Per-path allocations come from the router's vault using each path's `splitPpm`.",
    example: '1000000000',
  })
  @IsString()
  totalIn!: string;

  @ApiProperty({
    description: 'Aggregate slippage guard across all paths.',
    example: '6679778663',
  })
  @IsString()
  totalMinOut!: string;
}

/**
 * Execution-plane filter for the quote server.
 *   - `aggregator` (default): Soroban venues only (Soroswap + Aquarius +
 *     Phoenix + static bridges). Produces a `batch_execute` envelope
 *     safe for composable contract-to-contract use (Lending → Router).
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
 * Exactly one of `amountIn` or `amountOut` must be provided. `router`
 * + `sender` together populate `transaction.envelopeXdr` in the
 * response with a ready-to-sign `batch_execute` envelope.
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
 * { feeBps, poolAddress → pool, from → tokenIn, to → tokenOut, dex → venue }
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
      'Canonical pool identifier. C-strkey for Soroban pools, L-strkey for native AMM pools.',
  })
  @IsString()
  poolAddress!: string;

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
 * Single allocated path in the quote response. Maps 1:1 to `SwapPathDto`
 * (with field renames) when forwarded into the controller.
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
 * Unsigned Soroban transaction envelope returned when the quote
 * request supplied both `sender` and `router`. The caller MUST:
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
  quote!: StellarAggregatorQuoteResponseDto;
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
}
