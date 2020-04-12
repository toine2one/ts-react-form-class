import { ISelectBuildData } from "../interfaces/IForm";
export declare function selectField(fieldData: ISelectBuildData): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
