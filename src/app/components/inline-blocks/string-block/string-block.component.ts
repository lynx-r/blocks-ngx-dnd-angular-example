import {Component, Input, OnInit} from '@angular/core';
import {ContentComponent} from '../model/content-component';
import {BlockData} from '../model/block-data';
import {BlockText} from '../model/block-text';

@Component({
  selector: 'app-string-block',
  template: `
    <p>
      {{data.text}}
    </p>
  `,
  styles: []
})
export class StringBlockComponent implements OnInit, ContentComponent {

  @Input() data: BlockText;

  ngOnInit() {
  }

}
