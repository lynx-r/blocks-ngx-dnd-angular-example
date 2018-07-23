import {BlockType} from './block-type';

export class BlockMedia {
  type = BlockType.MEDIA;

  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
