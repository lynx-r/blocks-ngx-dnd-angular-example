import {BlockType} from './block-type';

export class BlockImage {
  type = BlockType.IMAGE;

  url: string;

  constructor(url: string) {
    this.url = url;
  }

  get data() {
    return this.url;
  }
}
