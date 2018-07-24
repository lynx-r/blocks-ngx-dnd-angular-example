import {IBlockData} from './block-data';

export class BlockText implements IBlockData {
  // type = BlockType.TEXT;

  text: string;

  get json() {
    return {text: this.text};
  }
}
