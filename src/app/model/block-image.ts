import {BlockData} from './block-data';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class BlockImage extends BlockData {
  @JsonProperty()
  url: string = undefined;
}
