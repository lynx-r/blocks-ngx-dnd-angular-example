import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {BlockText} from '../components/inline-blocks/model/block-text';
import {BlockImage} from '../components/inline-blocks/model/block-image';
import {ImageBlockComponent} from '../components/inline-blocks/image-block/image-block.component';
import {TextBlockComponent} from '../components/inline-blocks/text-block/text-block.component';
import {BlockVideo} from '../components/inline-blocks/model/block-video';
import {VideoBlockComponent} from '../components/inline-blocks/video-block/video-block.component';
import {BlockType} from '../components/inline-blocks/model/block-type';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  private components = {
    [BlockType.TEXT]: TextBlockComponent,
    [BlockType.VIDEO]: VideoBlockComponent,
    [BlockType.IMAGE]: ImageBlockComponent
  };

  private dataTypes = {
    [BlockType.TEXT]: BlockText,
    [BlockType.VIDEO]: BlockVideo,
    [BlockType.IMAGE]: BlockImage
  };

  constructor(private storage: StorageService) {
  }

  getBlocks() {
    // лостаем из хранилища данные о блоке
    const list = this.storage.getBlocks();
    // отображаем данные на блок для компонента
    return list.map(b => this.createBlock(b.type, b.data));
  }

  saveBlock(type: BlockType, data: string) {
    // создаем блок для компонента
    const aBlock = this.createBlock(type, data);
    // достаем из хранилища данные о блоке
    const list = this.storage.getBlocks();
    list.push({type: type, data: data});
    // сохраняем данные о блоке
    this.storage.saveBlocks(list);
    return aBlock;
  }

  saveBlocks(orderableLists: any[]) {
    const list = orderableLists.map(o => this.parseBlock(o.type, o.data));
    this.storage.saveBlocks(list);
  }

  clear() {
    this.storage.saveBlocks([]);
  }

  private createBlock(type: BlockType, data: string) {
    return {
      component: this.components[type],
      data: new this.dataTypes[type](data),
      type: type
    };
  }

  private parseBlock(type: BlockType, data: any) {
    return {
      type: type,
      data: data.data
    };
  }
}
