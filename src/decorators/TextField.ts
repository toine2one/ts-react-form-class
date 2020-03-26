import { ITextFieldBuildData } from "../interfaces/IForm";
import { fieldMetadataKey } from "../classes/FormClass";

export function textField(fieldData: ITextFieldBuildData) {
  return Reflect.metadata(fieldMetadataKey, fieldData);
}
