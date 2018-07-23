import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BlockText} from '../components/inline-blocks/model/block-text';
import {StringBlockComponent} from '../components/inline-blocks/string-block/string-block.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkspaceComponent implements OnInit {

  public orderableLists = [
    {component: StringBlockComponent, data: new BlockText('Привет')},
  ];

  constructor() {
  }

  ngOnInit() {
  }

  addBlock() {
    const aBlock = {
      component: StringBlockComponent,
      data: new BlockText('Новый блок ' + this.orderableLists.length)
    };
    this.orderableLists.push(aBlock);
  }
}