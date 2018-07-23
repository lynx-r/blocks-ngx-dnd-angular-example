import {Component, Input, OnInit} from '@angular/core';
import {BlockImage} from '../model/block-image';

@Component({
  selector: 'app-image-block',
  template: `
    <div class="block">
      <a [href]="data.url">Ссылка на изображение</a>
    </div>
  `,
  styles: [`
    .block {
      height: 90px;
      background-color: darkcyan;
    }
  `]
})
export class ImageBlockComponent implements OnInit {

  @Input() data: BlockImage;

  constructor() {
  }

  ngOnInit() {
  }

}
