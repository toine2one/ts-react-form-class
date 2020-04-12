import { FC } from "react";
import { ITextFieldBuildData, IField } from "../../interfaces/IForm";
interface ITextFieldProps {
    name: string;
    buildData: ITextFieldBuildData;
    validateInput: (fieldBuildData: ITextFieldBuildData, input: any) => string;
    data: IField;
    setInputValue: (fieldProp: string, input: any, validationError?: string) => void;
}
export declare const TextField: FC<ITextFieldProps>;
export {};
