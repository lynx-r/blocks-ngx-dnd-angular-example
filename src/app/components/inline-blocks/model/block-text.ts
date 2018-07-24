import {IBlockData} from './block-data';

export class BlockText implements IBlockData {
  // type = BlockType.TEXT;

  text: string;

  get json() {
    return JSON.stringify({text: this.text});
  }
}
