import { ISelectBuildData } from "../interfaces/IForm";
import { fieldMetadataKey } from "../classes/FormClass";

export function selectField(fieldData: ISelectBuildData) {
  return Reflect.metadata(fieldMetadataKey, fieldData);
}
