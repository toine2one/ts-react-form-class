import React, { FC } from "react";
import { ISelectBuildData, IField } from "../../interfaces/IForm";

interface ISelectFieldProps {
  name: string;
  buildData: ISelectBuildData;
  data: IField;
  setInputValue: (fieldProp: string, input: any, validationError?: string) => void;
}

export const SelectField: FC<ISelectFieldProps> = ({ name, buildData, data, setInputValue }) => {
  const onChange = (input: any) => {
    setInputValue(name, input);
  };
  Symbol("Example-form");
  return (
    <div>
      <select value={data ? data.value : ""} onChange={(e) => onChange(e.target.value)}>
        {buildData.options.map((opt) => {
          return (
            <option key={`field-option-${opt.value}`} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
