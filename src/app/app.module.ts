import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WorkspaceComponent} from './workspace/workspace.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxComponentOutletModule} from 'ngx-component-outlet';
import {InlineBlocksModule} from './components/inline-blocks/inline-blocks.module';
import {NgxDnDModule} from '@swimlane/ngx-dnd';
import {FormsModule} from '@angular/forms';
import {StorageServiceModule} from 'angular-webstorage-service';
import {ServicesModule} from './services/services.module';

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    NgxDnDModule,
    NgxComponentOutletModule.forRoot(),
    StorageServiceModule,

    ServicesModule,
    InlineBlocksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
