import { fieldMetadataKey } from "../classes/FormClass";
export function textField(fieldData) {
    return Reflect.metadata(fieldMetadataKey, fieldData);
}
