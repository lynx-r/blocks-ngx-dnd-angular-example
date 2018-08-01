import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StorageService} from './storage.service';
import {ApolloClientModule} from '../apollo-client/apollo-client.module';
import {JsonService} from './json.service';

@NgModule({
  imports: [
    CommonModule,
    ApolloClientModule
  ],
  providers: [StorageService, JsonService]
})
export class ServicesModule {
}
