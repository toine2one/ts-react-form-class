import { FC } from "react";
import { IRadioFieldBuildData, IField } from "../../interfaces/IForm";
interface IRadioFieldProps {
    name: string;
    buildData: IRadioFieldBuildData;
    data: IField;
    setInputValue: (fieldProp: string, input: any, validationError?: string) => void;
}
export declare const RadioField: FC<IRadioFieldProps>;
export {};
