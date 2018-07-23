import {BlockData} from './block-data';
import {BlockType} from './block-type';

export class BlockText implements BlockData {
  type = BlockType.TEXT;

  text: string;

  constructor(text: string) {
    this.text = text;
  }

  get data() {
    return this.text;
  }
}
