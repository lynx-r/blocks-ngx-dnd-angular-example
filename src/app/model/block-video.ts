import {BlockData} from './block-data';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class BlockVideo extends BlockData {
  @JsonProperty('url', String, true)
  url: string = undefined;
  @JsonProperty('youtubeId', String, true)
  youtubeId: string = undefined;
}
