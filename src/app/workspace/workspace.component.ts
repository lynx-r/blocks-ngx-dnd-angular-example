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

  constructor(private blockService: BlockService) {
  }

  ngOnInit() {
    this.blockSub = this.blockService.getBlocks()
      .subscribe(blocks => {
          console.log(blocks);
          this.blockList$ = new BehaviorSubject<any[]>(blocks);
          this.blockIdAndOrderCache = [...blocks.map(b => ({id: b.id, order: b.order}))];
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
        }
      );
    this.blockData = '';
  }

  saveList(event$) {
    console.log(event$);
    const dropBlock = this.blockIdAndOrderCache[event$.dropIndex];
    if (dropBlock === undefined) {
      return;
    }
    const blocks = (<Array<any>>this.blockList$.getValue());
    blocks.map((b, index) => b.order = blocks.length - index);
    this.blockService.saveBlocks(blocks)
      .subscribe(value => {
        this.blockList$.next(value);
      });
  }

  getJson() {
    return this.blockService.getJson();
  }

  updateList(item: any, data: BlockData) {
    this.blockService.saveBlock(item, data)
      .subscribe(savedBlock => {
        const arr = (<Array<any>>this.blockList$.getValue());
        arr.splice(arr.findIndex(b => b.id === savedBlock.id), 1, savedBlock);
        this.blockList$.next(arr);
      });
  }

  clearCache() {
    this.blockService.clear();
    // this.orderableLists$ = [];
  }
}
