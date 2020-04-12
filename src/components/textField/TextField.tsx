import React, { FC } from "react";
import { ITextFieldBuildData, IField } from "../../interfaces/IForm";

interface ITextFieldProps {
  name: string;
  buildData: ITextFieldBuildData;
  validateInput: (fieldBuildData: ITextFieldBuildData, input: any) => string;
  data: IField;
  setInputValue: (fieldProp: string, input: any, validationError?: string) => void;
}

export const TextField: FC<ITextFieldProps> = ({ name, buildData, validateInput, data, setInputValue }) => {
  const onChange = (input: any) => {
    const validationError = buildData.validations.length ? validateInput(buildData, input) : null;
    setInputValue(name, input, validationError);
  };

  return <input type="text" name={name} value={data ? data.value : ""} onChange={(e) => onChange(e.target.value)} />;
};
