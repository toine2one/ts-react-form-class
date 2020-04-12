import React, { FC } from "react";
import { ITextFieldBuildData, IFields, IField } from "../../interfaces/IForm";
interface IFormProps {
    data: IFields;
    onFieldInput: (fieldName: string, data: IField) => void;
    formName: string;
}
export interface IFormContextProps {
    fieldsData: IFields;
    setInputValue: (fieldProp: string, input: any, validationError?: string) => void;
    validateFieldInput(fieldBuildData: ITextFieldBuildData, input: any): string;
    unpersistField: (fieldName: string) => void;
    unpersistForm: () => void;
}
export declare const FormContext: React.Context<IFormContextProps>;
export declare const Form: FC<IFormProps>;
export {};
