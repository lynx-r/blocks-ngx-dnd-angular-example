import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BlockType} from '../components/inline-blocks/model/block-type';
import {BlockService} from '../services/block.service';

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

  addBlock(type: BlockType, data: string) {
    const aBlock = this.blockService.saveBlock(type, data);
    this.orderableLists.push(aBlock);
    this.blockData = '';
  }

  saveList() {
    this.blockService.saveBlocks(this.orderableLists);
  }

  clearCache() {
    this.blockService.clear();
    this.orderableLists = [];
  }
}
