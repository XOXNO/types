import { ApiProperty } from '@nestjs/swagger';

class TraitDetailsDto {
  @ApiProperty({ example: 63 })
  attributeOccurrence!: number;

  @ApiProperty({ example: 0.2, required: false })
  floorPrice?: number;

  @ApiProperty({ example: 4, required: false })
  onSaleCount?: number;

  @ApiProperty({ example: 7.305, required: false })
  usdValue?: number;
}

class ExampleSectionDto {
  @ApiProperty({ type: TraitDetailsDto })
  exampleTrait!: TraitDetailsDto;

  @ApiProperty({ type: TraitDetailsDto })
  anotherTrait!: TraitDetailsDto;
}

export class AttributesExamplesDto {
  @ApiProperty({ type: ExampleSectionDto })
  Background!: ExampleSectionDto;

  @ApiProperty({ type: ExampleSectionDto })
  Fur!: ExampleSectionDto;

  @ApiProperty({ type: ExampleSectionDto })
  Eyes!: ExampleSectionDto;

  @ApiProperty({ type: ExampleSectionDto })
  Mouth!: ExampleSectionDto;

  @ApiProperty({ type: ExampleSectionDto })
  Clothes!: ExampleSectionDto;

  @ApiProperty({ type: ExampleSectionDto })
  Hat!: ExampleSectionDto;

  @ApiProperty({ type: ExampleSectionDto })
  Accessories!: ExampleSectionDto;

  @ApiProperty({ type: ExampleSectionDto })
  Faction!: ExampleSectionDto;

  @ApiProperty({ type: ExampleSectionDto })
  Special!: ExampleSectionDto;
}
