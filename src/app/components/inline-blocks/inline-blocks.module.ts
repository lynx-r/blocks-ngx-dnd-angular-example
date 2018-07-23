import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineHostComponent} from './inline-host-component/inline-host.component';
import {StringBlockComponent} from './string-block/string-block.component';
import {MediaBlockComponent} from './media-block/media-block.component';
import {NgxComponentOutletModule} from 'ngx-component-outlet';

@NgModule({
  imports: [
    CommonModule,
    NgxComponentOutletModule
  ],
  declarations: [InlineHostComponent, StringBlockComponent, MediaBlockComponent],
  exports: [InlineHostComponent, StringBlockComponent, MediaBlockComponent],
  entryComponents: [
    InlineHostComponent, StringBlockComponent, MediaBlockComponent
  ]
})
export class InlineBlocksModule {
}
