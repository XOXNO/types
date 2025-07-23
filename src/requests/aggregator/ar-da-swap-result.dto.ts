import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ArdaSwapResultDto {
  @ApiProperty({
    description: 'The input token identifier',
    example: 'WEGLD-d7c6b3',
  })
  @IsNotEmpty()
  @IsString()
  tokenIn!: string;

  @ApiProperty({
    description: 'The amount of input token in its raw form (with decimals)',
    example: '1000000000000000000',
  })
  @IsNotEmpty()
  @IsString()
  amountIn!: string;

  @ApiProperty({
    description:
      'The amount of input token in human-readable form (without decimals)',
    example: '1.0',
  })
  @IsNotEmpty()
  @IsString()
  amountInShort!: string;

  @ApiProperty({
    description: 'The output token identifier',
    example: 'USDC-c76f1f',
  })
  @IsNotEmpty()
  @IsString()
  tokenOut!: string;

  @ApiProperty({
    description: 'The amount of output token in its raw form (with decimals)',
    example: '1000000000',
  })
  @IsNotEmpty()
  @IsString()
  amountOut!: string;

  @ApiProperty({
    description:
      'The amount of output token in human-readable form (without decimals)',
    example: '1.0',
  })
  @IsNotEmpty()
  @IsString()
  amountOutShort!: string;

  @ApiProperty({
    description: 'The encoded arguments for the smart contract call',
    example: '0x1234567890abcdef',
  })
  @IsNotEmpty()
  @IsString()
  argument!: string;

  @ApiProperty({
    description: 'The gas limit required for the transaction',
    example: 10000000,
  })
  @IsNotEmpty()
  @IsNumber()
  gasLimit!: number;
}
