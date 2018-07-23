import {Component, Input, OnInit} from '@angular/core';
import {BlockData} from '../model/block-data';

@Component({
  selector: 'app-inline-host',
  template: `
  `,
  styles: []
})
export class InlineHostComponent implements OnInit {

  @Input() data: BlockData;

  constructor() {
  }

  ngOnInit() {
  }

}
