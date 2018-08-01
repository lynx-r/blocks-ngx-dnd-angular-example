import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineHostComponent} from './inline-host-component/inline-host.component';
import {TextBlockComponent} from './text-block/text-block.component';
import {VideoBlockComponent} from './video-block/video-block.component';
import {NgxComponentOutletModule} from 'ngx-component-outlet';
import {ImageBlockComponent} from './image-block/image-block.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {BlockActionsComponent} from './block-actions/block-actions.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {PipesModule} from '../../pipes/pipes.module';
import {OrderComponent} from './order/order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    NgxComponentOutletModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,

    PipesModule
  ],
  declarations: [InlineHostComponent, TextBlockComponent, VideoBlockComponent, ImageBlockComponent, BlockActionsComponent, OrderComponent],
  exports: [InlineHostComponent, TextBlockComponent, VideoBlockComponent],
  entryComponents: [
    InlineHostComponent, TextBlockComponent, VideoBlockComponent, ImageBlockComponent
  ]
})
export class InlineBlocksModule {
}
