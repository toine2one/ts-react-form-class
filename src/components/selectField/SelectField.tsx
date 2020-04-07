import React, { FC, useContext } from "react";
import { FormContext } from "../form/Form";
import { ISelectBuildData } from "../../interfaces/IForm";

interface ISelectFieldProps {
  name: string;
  buildData: ISelectBuildData;
}

export const SelectField: FC<ISelectFieldProps> = ({ name, buildData }) => {
  const { fieldsData, setInputValue } = useContext(FormContext);

  const onChange = (input: any) => {
    setInputValue(name, input);
  };

  return (
    <div>
      <select value={fieldsData[name] ? fieldsData[name].value : ""} onChange={(e) => onChange(e.target.value)}>
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
