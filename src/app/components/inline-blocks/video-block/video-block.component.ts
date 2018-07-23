import {Component, Input, OnInit} from '@angular/core';
import {ContentComponent} from '../model/content-component';
import {BlockVideo} from '../model/block-video';

@Component({
  selector: 'app-media-block',
  template: `
    <div class="block">
      <a [href]="data.url">Ссылка на видео</a>
    </div>
  `,
  styles: [
      `
      .block {
        height: 90px;
        background-color: darkred;
      }
    `
  ]
})
export class VideoBlockComponent implements OnInit, ContentComponent {

  @Input() data: BlockVideo;

  ngOnInit() {
  }

}
