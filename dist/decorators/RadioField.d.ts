import { IRadioFieldBuildData } from "../interfaces/IForm";
export declare function radioField(fieldData: IRadioFieldBuildData): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
