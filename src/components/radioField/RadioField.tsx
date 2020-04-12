import React, { FC } from "react";
import { IRadioFieldBuildData, IField } from "../../interfaces/IForm";

interface IRadioFieldProps {
  name: string;
  buildData: IRadioFieldBuildData;
  data: IField;
  setInputValue: (fieldProp: string, input: any, validationError?: string) => void;
}

export const RadioField: FC<IRadioFieldProps> = ({ name, buildData, setInputValue, data }) => {
  const onChange = (input: any) => {
    setInputValue(name, input);
  };

  return (
    <div>
      {buildData.options.map((opt) => {
        return (
          <span key={`radio-field-${opt.value}`}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              onChange={(e) => onChange(e.target.value)}
              checked={data ? `${data.value}` === `${opt.value}` : false}></input>
            <label>{opt.label}</label>
            <br></br>
          </span>
        );
      })}
    </div>
  );
};
