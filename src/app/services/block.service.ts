import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {BlockText} from '../model/block-text';
import {BlockImage} from '../model/block-image';
import {ImageBlockComponent} from '../components/inline-blocks/image-block/image-block.component';
import {TextBlockComponent} from '../components/inline-blocks/text-block/text-block.component';
import {BlockVideo} from '../model/block-video';
import {VideoBlockComponent} from '../components/inline-blocks/video-block/video-block.component';
import {EnumBlockType} from '../model/enum-block-type';
import {ApolloService} from './apollo.service';
import {map} from 'rxjs/operators';
import {JsonService} from './json.service';
import {BlockData} from '../model/block-data';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  private components = {
    [EnumBlockType.TEXT]: TextBlockComponent,
    [EnumBlockType.VIDEO]: VideoBlockComponent,
    [EnumBlockType.IMAGE]: ImageBlockComponent
  };

  private dataTypes = {
    [EnumBlockType.TEXT]: BlockText,
    [EnumBlockType.VIDEO]: BlockVideo,
    [EnumBlockType.IMAGE]: BlockImage
  };

  private initialData = {
    [EnumBlockType.TEXT]: {id: '', text: 'УРОК 1'},
    [EnumBlockType.VIDEO]: {id: '', youtubeId: 'vcsGu9ug9J4'},
    [EnumBlockType.IMAGE]: {id: '', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'}
  };

  constructor(private storage: StorageService,
              private apolloService: ApolloService,
              private jsonService: JsonService) {
  }

  getBlocks() {
    return this.apolloService.queryBlocks()
      .pipe(
        map(blocks => blocks.map(block => this.restoreBlock(block)))
      );
  }

  createBlock(listLength, type: EnumBlockType) {
    listLength++;
    // создаем блок для компонента
    const aBlock = this.createDefaultBlock({id: undefined, type: type, data: undefined, order: listLength});
    // достаем из хранилища данные о блоке
    const dataString = this.jsonService.serialize(aBlock.data);
    return this.apolloService.addBlock(type, dataString, listLength)
      .pipe(
        map(block => this.restoreBlock(block))
      );
  }

  saveBlock(block: any, data: BlockData) {
    console.log(block, data);
    const dataStr = this.jsonService.serialize(block.data);
    return this.apolloService.saveBlock(block, dataStr, block.order)
      .pipe(
        map(b => this.restoreBlock(b))
      );
  }

  saveBlocks(blocks: Array<any>) {
    const blockMapped = blocks.map(b =>
      // todo introduce type
      (this.jsonService.serialize({id: b.id, type: b.type, data: this.jsonService.serialize(b.data), order: b.order}))
    );
    console.log('SAVE BLOCKS', blockMapped);
    return this.apolloService.saveBlocks(blockMapped)
      .pipe(
        map(b => console.log(b))
      );
  }

  getJson() {
    return JSON.stringify(this.storage.getBlocks(), null, 4);
  }

  clear() {
    this.storage.saveBlocks([]);
  }

  private createDefaultBlock(block: any) {
    const {id, type, data, order} = block;
    const dataObj = this.jsonService.deserialize(<any>this.dataTypes[type], this.initialData[type]);
    return {
      component: this.components[type],
      data: dataObj,
      type: type,
      order: order
    };
  }

  private restoreBlock(block: any) {
    const {id, type, data, order} = block;
    console.log('restore', block, id, type, data);
    const dataObj = this.jsonService.deserialize(<any>this.dataTypes[type], data);

    // fixme ???
    const blocks = this.storage.getBlocks();
    blocks.push({data: dataObj, type: type, order: order});
    this.storage.saveBlocks(blocks);
    // ***

    return {
      id: id,
      component: this.components[type],
      data: dataObj,
      type: type,
      order: order
    };
  }
}
