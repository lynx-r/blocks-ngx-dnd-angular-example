import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BlockType} from '../components/inline-blocks/model/block-type';
import {BlockService} from '../services/block.service';
import {IBlockData} from '../components/inline-blocks/model/block-data';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkspaceComponent implements OnInit {

  blockType = BlockType.TEXT;
  blockData = '';
  BlockType = BlockType;

  public orderableLists = [];

  constructor(private blockService: BlockService) {
  }

  ngOnInit() {
    this.orderableLists = this.blockService.getBlocks();
  }

  addBlock(type: BlockType) {
    const aBlock = this.blockService.createBlock(type);
    this.orderableLists.push(aBlock);
    this.blockData = '';
  }

  saveList() {
    this.blockService.saveBlocks(this.orderableLists);
  }

  getJson() {
    return this.blockService.getJson();
  }

  updateList(item: any, data: IBlockData) {
    this.orderableLists.splice(this.orderableLists.indexOf(item), 1, {...item, data: data});
    this.saveList();
  }

  clearCache() {
    this.blockService.clear();
    this.orderableLists = [];
  }
}
