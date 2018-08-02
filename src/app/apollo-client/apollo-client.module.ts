import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpClientModule} from '@angular/common/http';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {profile} from '../config/profile';
import * as config from '../config/config.json';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri: (<any>config)[profile].graphql}),
    cache: new InMemoryCache(),
    // defaultOptions: {
    // watchQuery: {
    // fetchPolicy: 'no-cache',
    // errorPolicy: 'all',
    // },
    // query: {
    //   fetchPolicy: 'no-cache',
    fetchPolicy: 'network-only',
    // errorPolicy: 'all',
    // },
    // mutate: {
    //   errorPolicy: 'all',
    // },
    // }
  };
}

@NgModule({
  imports: [
    CommonModule,
    ApolloModule,
    HttpClientModule,
    HttpLinkModule,
  ],
  declarations: [],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class ApolloClientModule {
}
