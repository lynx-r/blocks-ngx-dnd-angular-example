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
              order
            }
          }
        `,
      })
      .valueChanges
      .map(({data}) => data.blocks);
  }

  addBlock(type: EnumBlockType, data: any, order: number) {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation Block {
            add (type: "${type}", data: "${data}", order: ${order}) {
              id,
              type,
            data,
            order
            }
          }
        `
      })
      .map((d) => d.data.add);
  }

  saveBlock(block: any, data: string, order: number) {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation Block {
            save (id: "${block.id}", data: "${data}", order: ${order}) {
              id,
              type,
            data,
            order
            }
          }
        `
      })
      .map((d) => d.data.save);
  }

  saveBlocks(blockMapped: string[]) {
    return this.apollo
    .mutate({
      mutation: gql`
        mutation Block {
          batchSave (blocks: [${blockMapped}]) {
            blocks
          }
        }
      `
    });
  }
}
