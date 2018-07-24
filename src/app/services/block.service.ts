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

  private initalData = {
    [BlockType.TEXT]: '{"text": "УРОК 1"}',
    [BlockType.VIDEO]: '{"youtubeId": "vcsGu9ug9J4"}',
    [BlockType.IMAGE]: '{"url": "https://material.angular.io/assets/img/examples/shiba2.jpg"}'
  };

  constructor(private storage: StorageService) {
  }

  getBlocks() {
    // лостаем из хранилища данные о блоке
    const list = this.storage.getBlocks();
    // отображаем данные на блок для компонента
    return list.map(b => this.restoreBlock(b.type, b.data));
  }

  createBlock(type: BlockType) {
    // создаем блок для компонента
    const aBlock = this.createBlockComponent(type);
    // достаем из хранилища данные о блоке
    const list = this.storage.getBlocks();
    list.push({type: type, data: aBlock.data.json});
    // сохраняем данные о блоке
    this.storage.saveBlocks(list);
    return aBlock;
  }

  saveBlocks(orderableLists: any[]) {
    const list = orderableLists.map(o => ({type: o.type, data: o.data.json}));
    this.storage.saveBlocks(list);
  }

  getJson() {
    return JSON.stringify(this.storage.getBlocks(), null, 4);
  }

  clear() {
    this.storage.saveBlocks([]);
  }

  private createBlockComponent(type: BlockType) {
    const data = Object.assign(new this.dataTypes[type](), JSON.parse(this.initalData[type]));
    return {
      component: this.components[type],
      data: data,
      type: type
    };
  }

  private restoreBlock(type: BlockType, json: string) {
    const data = Object.assign(new this.dataTypes[type](), JSON.parse(json));
    return {
      component: this.components[type],
      data: data,
      type: type
    };
  }
}
