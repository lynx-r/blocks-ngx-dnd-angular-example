import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DndListModule} from 'ngx-drag-and-drop-lists';
import {NgxComponentOutletModule} from 'ngx-component-outlet';
import {InlineBlocksModule} from './components/inline-blocks/inline-blocks.module';

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
    DndListModule,
    NgxComponentOutletModule.forRoot(),

    InlineBlocksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
