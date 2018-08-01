import {BlockData} from './block-data';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class BlockText extends BlockData {
  // type = EnumBlockType.TEXT;

  @JsonProperty()
  text: string = undefined;

}
