import { FC } from "react";
import { ISelectBuildData, IField } from "../../interfaces/IForm";
interface ISelectFieldProps {
    name: string;
    buildData: ISelectBuildData;
    data: IField;
    setInputValue: (fieldProp: string, input: any, validationError?: string) => void;
}
export declare const SelectField: FC<ISelectFieldProps>;
export {};
