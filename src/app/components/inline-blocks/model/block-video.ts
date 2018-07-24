import {IBlockData} from './block-data';

export class BlockVideo implements IBlockData {
  // type = BlockType.VIDEO;

  url: string;

  youtubeId: string;

  get json() {
    return JSON.stringify({url: this.url, youtubeId: this.youtubeId});
  }

}
