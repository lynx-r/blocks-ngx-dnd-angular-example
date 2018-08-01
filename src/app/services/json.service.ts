import {Injectable, Type} from '@angular/core';
import {JsonConvert} from 'json2typescript';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  private jsonConvert: JsonConvert;

  constructor() {
    this.jsonConvert = new JsonConvert();
  }

  deserialize(str: any, clazz: Type<any>) {
    try {
      let json = str;
      if (typeof str === 'string') {
        json = JSON.parse(str);
      }
      return this.jsonConvert.deserialize(json, clazz);
    } catch (e) {
      console.log(<Error>e);
    }
  }

  serialize(data: any) {
    const serialize = this.jsonConvert.serialize(data);
    let str = JSON.stringify(serialize);
    str = str.replace(/"/g, '\\"');
    console.log('str', str);
    return str;
  }
}
