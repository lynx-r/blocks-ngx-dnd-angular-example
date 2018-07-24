import {IBlockData} from './block-data';

export class BlockImage implements IBlockData {
  // type = BlockType.IMAGE;

  url: string;

  get json() {
    return {url: this.url};
  }
}
