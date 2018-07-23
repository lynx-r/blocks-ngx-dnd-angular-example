import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineHostComponent} from './inline-host-component/inline-host.component';
import {TextBlockComponent} from './text-block/text-block.component';
import {VideoBlockComponent} from './video-block/video-block.component';
import {NgxComponentOutletModule} from 'ngx-component-outlet';
import {ImageBlockComponent} from './image-block/image-block.component';

@NgModule({
  imports: [
    CommonModule,
    NgxComponentOutletModule
  ],
  declarations: [InlineHostComponent, TextBlockComponent, VideoBlockComponent, ImageBlockComponent],
  exports: [InlineHostComponent, TextBlockComponent, VideoBlockComponent],
  entryComponents: [
    InlineHostComponent, TextBlockComponent, VideoBlockComponent, ImageBlockComponent
  ]
})
export class InlineBlocksModule {
}
