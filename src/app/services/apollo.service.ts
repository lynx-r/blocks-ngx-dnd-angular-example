import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {EnumBlockType} from '../model/enum-block-type';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {

  constructor(private apollo: Apollo) {
  }

  queryBlocks() {
    return this.apollo
      .watchQuery<{ blocks: Array<{ id, type, data }> }>({
        query: gql`
          query Block {
            blocks {
              id
              type
              data
            }
          }
        `,
      })
      .valueChanges
      .map(({data}) => data.blocks);
  }

  addBlock(type: EnumBlockType, data: any) {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation Block {
            add (type: "${type}", data: "${data}") {
              id,
              type,
              data
            }
          }
        `
      })
      .map((d) => d.data.add);
  }
}
