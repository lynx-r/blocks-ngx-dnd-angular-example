import {IBlockData} from './block-data';

export class BlockVideo implements IBlockData {
  // type = BlockType.VIDEO;

  url: string;

  youtubeId: string;

  get json() {
    return {url: this.url, youtubeId: this.youtubeId};
  }

}
