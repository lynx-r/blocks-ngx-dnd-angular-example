import {Component, Input, OnInit} from '@angular/core';
import {ContentComponent} from '../model/content-component';
import {BlockText} from '../model/block-text';

@Component({
  selector: 'app-string-block',
  template: `
    <div class="text">
      Текст: {{data.text}}
    </div>
  `,
  styles: [
      `
      .text {
        height: 90px;
        background-color: yellow;
      }
    `
  ]
})
export class TextBlockComponent implements OnInit, ContentComponent {

  @Input() data: BlockText;

  ngOnInit() {
  }

}
