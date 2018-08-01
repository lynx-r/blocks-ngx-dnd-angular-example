import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlockData} from '../../../model/block-data';

@Component({
  selector: 'app-inline-host',
  template: `
  `,
  styles: []
})
export class InlineHostComponent implements OnInit {

  @Output() edited = new EventEmitter<BlockData>();

  @Input() data: BlockData;
  @Input() order: number;

  constructor() {
  }

  ngOnInit() {
  }

}
