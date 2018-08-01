import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class BlockData {
  @JsonProperty()
  id: string;
}
