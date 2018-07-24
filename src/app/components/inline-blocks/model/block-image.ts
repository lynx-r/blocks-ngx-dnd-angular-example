import {BlockType} from './block-type';
import {IBlockData} from './block-data';

export class BlockImage implements IBlockData {
  type = BlockType.IMAGE;

  url: string;

  get json() {
    return JSON.stringify({url: this.url, type: this.type});
  }

  set fromJson(json: string) {
    const obj = JSON.parse(json);
    this.type = obj.type;
    this.url = obj.url;
  }
}
