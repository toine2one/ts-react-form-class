import { IRadioFieldBuildData } from "../interfaces/IForm";
import { fieldMetadataKey } from "../classes/FormClass";

export function radioField(fieldData: IRadioFieldBuildData) {
  return Reflect.metadata(fieldMetadataKey, fieldData);
}
