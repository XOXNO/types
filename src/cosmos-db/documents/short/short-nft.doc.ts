import { PickType } from '@nestjs/swagger';
import { NftDoc } from '../token/nft-details.doc';

export class ShortNftDoc extends PickType(NftDoc, [
  'identifier',
  'collection',
  'name',
  'metadata',
  'url',
  'wasProcessed',
  'media',
]) {}
