import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WorkspaceComponent} from './workspace/workspace.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxComponentOutletModule} from 'ngx-component-outlet';
import {InlineBlocksModule} from './components/inline-blocks/inline-blocks.module';
import {NgxDnDModule} from '@swimlane/ngx-dnd';

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgxDnDModule,
    NgxComponentOutletModule.forRoot(),

    InlineBlocksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
