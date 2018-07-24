import {EventEmitter} from '@angular/core';

export interface ContentComponent {
  edited: EventEmitter<any>;

  data: any;
}
