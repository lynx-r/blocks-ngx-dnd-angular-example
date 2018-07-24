import {IBlockData} from './block-data';
import {BlockType} from './block-type';

export class BlockText implements IBlockData {
  type = BlockType.TEXT;

  text: string;

  get json() {
    return JSON.stringify({text: this.text, type: this.type});
  }
}
