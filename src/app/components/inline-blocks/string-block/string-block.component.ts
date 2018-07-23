import {Component, Input, OnInit} from '@angular/core';
import {ContentComponent} from '../model/content-component';
import {BlockText} from '../model/block-text';

@Component({
  selector: 'app-string-block',
  template: `
    <div class="text">
      {{data.text}}
    </div>
  `,
  styles: [
      `
      .text {
        background-color: yellow;
      }
    `
  ]
})
export class StringBlockComponent implements OnInit, ContentComponent {

  @Input() data: BlockText;

  ngOnInit() {
  }

}
