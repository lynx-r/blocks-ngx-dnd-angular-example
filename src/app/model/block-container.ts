import {EnumBlockType} from './enum-block-type';
import {JsonConverter, JsonCustomConvert, JsonObject, JsonProperty} from 'json2typescript';
import {BlockData} from './block-data';

@JsonConverter
class BlockTypeConverter implements JsonCustomConvert<EnumBlockType> {
  serialize(blockType: EnumBlockType): any {
    return blockType.valueOf();
  }

  deserialize(blockType: any): EnumBlockType {
    return EnumBlockType[EnumBlockType[blockType]];
  }
}

@JsonObject
export class BlockContainer {
  @JsonProperty()
  id: string = undefined;
  @JsonProperty('type', BlockTypeConverter)
  type: EnumBlockType = undefined;
  @JsonProperty()
  data: BlockData = undefined;
  @JsonProperty()
  order: number = undefined;

  constructor(id: string, type: EnumBlockType, data: BlockData, order: number) {
    this.id = id;
    this.type = type;
    this.data = data;
    this.order = order;
  }
}
