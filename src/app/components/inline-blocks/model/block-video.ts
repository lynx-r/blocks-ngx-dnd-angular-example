import {BlockType} from './block-type';

export class BlockVideo {
  type = BlockType.VIDEO;

  url: string;

  constructor(url: string) {
    this.url = url;
  }

  get data() {
    return this.url;
  }
}
