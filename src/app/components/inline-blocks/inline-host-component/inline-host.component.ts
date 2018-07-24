import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IBlockData} from '../model/block-data';

@Component({
  selector: 'app-inline-host',
  template: `
  `,
  styles: []
})
export class InlineHostComponent implements OnInit {

  @Output() edited = new EventEmitter<IBlockData>();

  @Input() data: IBlockData;

  constructor() {
  }

  ngOnInit() {
  }

}
