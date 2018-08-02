import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {EnumBlockType} from '../model/enum-block-type';
import {BlockService} from '../services/block.service';
import {BlockData} from '../model/block-data';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkspaceComponent implements OnInit, OnDestroy {

  blockType = EnumBlockType.TEXT;
  blockData = '';
  BlockType = EnumBlockType;

  blockList$: BehaviorSubject<any>;
  private blockSub: Subscription;
  private blockIdAndOrderCache: any[];
  private blocksJson: string;

  constructor(private blockService: BlockService) {
  }

  ngOnInit() {
    this.blockSub = this.blockService.getBlocks()
      .subscribe(blocks => {
          this.blockList$ = new BehaviorSubject<any[]>(blocks);
          this.blockIdAndOrderCache = [...blocks.map(b => ({id: b.id, order: b.order}))];
        this.updateBlocksJson(blocks);
        }
      );
  }

  ngOnDestroy() {
    this.blockSub.unsubscribe();
  }

  addBlock(type: EnumBlockType) {
    const arr = <any[]>this.blockList$.getValue();
    this.blockService.createBlock(arr.length, type)
      .subscribe(newBlock => {
          const newBlockArr = [newBlock];
        const value = [...newBlockArr, ...arr];
          this.blockList$.next(value);
        this.updateBlocksJson(value);
        }
      );
    this.blockData = '';
  }

  saveList(event$) {
    const dropBlock = this.blockIdAndOrderCache[event$.dropIndex];
    if (dropBlock === undefined) {
      return;
    }
    const blocks = (<Array<any>>this.blockList$.getValue());
    blocks.map((b, index) => b.order = blocks.length - index);
    this.blockService.saveBlocks(blocks)
      .subscribe(value => {
        this.blockList$.next(value);
        this.updateBlocksJson(value);
      });
  }

  getJson() {
    return this.blocksJson;
  }

  updateList(item: any, data: BlockData) {
    this.blockService.saveBlock(item, data)
      .subscribe(savedBlock => {
        const arr = (<Array<any>>this.blockList$.getValue());
        arr.splice(arr.findIndex(b => b.id === savedBlock.id), 1, savedBlock);
        arr.sort((a, b) => b.order - a.order);
        this.blockList$.next(arr);
        this.updateBlocksJson(arr);
      });
  }

  private updateBlocksJson(blocks: any[]) {
    this.blocksJson = JSON.stringify(blocks.map(b => ({id: b.id, type: b.type, data: b.data, order: b.order})), null, 4);
  }
}
