import {BlockData} from './block-data';
import {JsonObject} from 'json2typescript';

@JsonObject
export class BlockImage extends BlockData {
  // type = EnumBlockType.IMAGE;

  url: string;

}
