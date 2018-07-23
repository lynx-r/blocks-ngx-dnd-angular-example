import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable()
export class StorageService {

  private static BLOCKS_KEY = 'blocks';

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
  }

  saveInLocal(key: string, val: any): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }

  getBlocks() {
    const list = this.getFromLocal(StorageService.BLOCKS_KEY);
    return list == null ? [] : list;
  }

  saveBlocks(val: any[]) {
    this.saveInLocal(StorageService.BLOCKS_KEY, val);
  }
}
