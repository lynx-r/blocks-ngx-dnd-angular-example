import {Type} from '@angular/core';

export class ContentItem {

  constructor(public component: Type<any>, public key: number, public data: any, public blockStyle: string = 'block') {
  }
}
