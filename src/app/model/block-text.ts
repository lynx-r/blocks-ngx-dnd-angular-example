import {BlockData} from './block-data';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class BlockText extends BlockData {
  @JsonProperty()
  text: string = undefined;
}
