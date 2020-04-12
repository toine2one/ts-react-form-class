import { ITextFieldBuildData } from "../interfaces/IForm";
export declare function textField(fieldData: ITextFieldBuildData): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
