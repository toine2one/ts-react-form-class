import React, { FC, useContext } from "react";
import { FormContext } from "../form/Form";
import { IRadioFieldBuildData } from "../../interfaces/IForm";

interface IRadioFieldProps {
  name: string;
  buildData: IRadioFieldBuildData;
}

export const RadioField: FC<IRadioFieldProps> = ({ name, buildData }) => {
  const { fieldsData, setInputValue } = useContext(FormContext);

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
              checked={fieldsData[name] ? `${fieldsData[name].value}` === `${opt.value}` : false}></input>
            <label>{opt.label}</label>
            <br></br>
          </span>
        );
      })}
    </div>
  );
};
