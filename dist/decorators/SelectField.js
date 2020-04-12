import { fieldMetadataKey } from "../classes/FormClass";
export function selectField(fieldData) {
    return Reflect.metadata(fieldMetadataKey, fieldData);
}
