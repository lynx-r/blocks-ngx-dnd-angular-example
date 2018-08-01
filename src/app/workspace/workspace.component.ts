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

  constructor(private blockService: BlockService) {
  }

  ngOnInit() {
    this.blockSub = this.blockService.getBlocks()
      .subscribe(blocks =>
        this.blockList$ = new BehaviorSubject<any[]>(blocks)
      );
  }

  ngOnDestroy() {
    this.blockSub.unsubscribe();
  }

  addBlock(type: EnumBlockType) {
    this.blockService.createBlock(type)
      .subscribe(newBlock => {
          const newBlockArr = [newBlock];
          const value = [...newBlockArr, ...this.blockList$.getValue()];
          this.blockList$.next(value);
        }
      );
    this.blockData = '';
  }

  saveList() {
    // this.blockService.saveBlock(this.blockList$.getValue());
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
