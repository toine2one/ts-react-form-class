import React, { FC, useContext } from "react";
import { FormContext } from "../form/Form";
import { IRadioOption } from "../../interfaces/IForm";

interface IRadioFieldProps {
  name: string;
  options: IRadioOption[];
}

export const RadioField: FC<IRadioFieldProps> = ({ name, options }) => {
  const { setInputValue } = useContext(FormContext);

  const onChange = (input: any) => {
    setInputValue(name, input);
  };

  return (
    <div>
      {options.map(opt => {
        return (
          <span key={`radio-field-${opt.value}`}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              onChange={e => onChange(e.target.value)}
              defaultChecked={false}></input>
            <label>{opt.label}</label>
            <br></br>
          </span>
        );
      })}
    </div>
  );
};
