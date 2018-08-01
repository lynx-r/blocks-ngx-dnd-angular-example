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
    [EnumBlockType.TEXT]: {text: 'УРОК 1'},
    [EnumBlockType.VIDEO]: {youtubeId: 'vcsGu9ug9J4'},
    [EnumBlockType.IMAGE]: {url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'}
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

  createBlock(type: EnumBlockType) {
    // создаем блок для компонента
    const aBlock = this.createDefaultBlock({id: undefined, type: type, data: undefined});
    // достаем из хранилища данные о блоке
    const dataString = this.jsonService.serialize(aBlock.data);
    return this.apolloService.addBlock(type, dataString)
      .pipe(
        map(block => this.restoreBlock(block))
      );
  }

  saveBlock(block: any, data: BlockData) {
    console.log(block, data);
    const dataStr = this.jsonService.serialize(block.data);
    return this.apolloService.saveBlocks(block, dataStr)
      .pipe(
        map(b => this.restoreBlock(b))
      );
  }

  getJson() {
    return JSON.stringify(this.storage.getBlocks(), null, 4);
  }

  clear() {
    this.storage.saveBlocks([]);
  }

  private createDefaultBlock(block: any) {
    const {id, type, data} = block;
    const dataObj = this.jsonService.deserialize(<any>this.dataTypes[type], this.initialData[type]);
    return {
      component: this.components[type],
      data: dataObj,
      type: type
    };
  }

  private restoreBlock(block: any) {
    const {id, type, data} = block;
    console.log('restore', block, id, type, data);
    const dataObj = this.jsonService.deserialize(<any>this.dataTypes[type], data);

    // fixme ???
    const blocks = this.storage.getBlocks();
    blocks.push({data: dataObj, type: type});
    this.storage.saveBlocks(blocks);
    // ***

    return {
      id: id,
      component: this.components[type],
      data: dataObj,
      type: type
    };
  }
}
