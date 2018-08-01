import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EnumBlockType} from '../model/enum-block-type';
import {BlockService} from '../services/block.service';
import {BlockData} from '../model/block-data';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkspaceComponent implements OnInit {

  blockType = EnumBlockType.TEXT;
  blockData = '';
  BlockType = EnumBlockType;

  public orderableLists$: Observable<any>;

  constructor(private blockService: BlockService) {
  }

  ngOnInit() {
    this.orderableLists$ = this.blockService.getBlocks();
    this.orderableLists$.subscribe(b => console.log('got', b));
  }

  addBlock(type: EnumBlockType) {
    const aBlock = this.blockService.createBlock(type);
    // this.orderableLists$.push(aBlock);
    this.blockData = '';
  }

  saveList() {
    // this.blockService.saveBlocks(this.orderableLists$);
  }

  getJson() {
    return this.blockService.getJson();
  }

  updateList(item: any, data: BlockData) {
    // this.orderableLists$.splice(this.orderableLists$.indexOf(item), 1, {...item, data: data});
    this.saveList();
  }

  clearCache() {
    this.blockService.clear();
    // this.orderableLists$ = [];
  }
}
