import { fieldMetadataKey } from "../classes/FormClass";
export function radioField(fieldData) {
    return Reflect.metadata(fieldMetadataKey, fieldData);
}
