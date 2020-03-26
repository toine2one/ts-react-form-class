import React, { FC, useContext } from "react";
import { FormContext } from "../form/Form";
import { ISelectOption } from "../../interfaces/IForm";

interface ISelectFieldProps {
  name: string;
  options: ISelectOption[];
}

export const SelectField: FC<ISelectFieldProps> = ({ name, options }) => {
  const { fieldsData, setInputValue } = useContext(FormContext);

  const onChange = (input: any) => {
    setInputValue(name, input);
  };

  return (
    <div>
      <select value={fieldsData[name].value} onChange={e => onChange(e.target.value)}>
        {options.map(opt => {
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
