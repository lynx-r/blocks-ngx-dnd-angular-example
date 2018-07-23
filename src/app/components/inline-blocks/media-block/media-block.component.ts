import {Component, Input, OnInit} from '@angular/core';
import {ContentComponent} from '../model/content-component';
import {BlockData} from '../model/block-data';
import {BlockMedia} from '../model/block-media';

@Component({
  selector: 'app-media-block',
  template: `
    <p>
      media-block works!
    </p>
  `,
  styles: []
})
export class MediaBlockComponent implements OnInit, ContentComponent {

  @Input() data: BlockMedia;

  ngOnInit() {
  }

}
