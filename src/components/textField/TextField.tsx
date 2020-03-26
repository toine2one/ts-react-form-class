import React, { FC, useContext } from "react";
import { FormContext } from "../form/Form";
import { ITextFieldBuildData } from "../../interfaces/IForm";

interface ITextFieldProps {
  name: string;
  buildData: ITextFieldBuildData;
}

export const TextField: FC<ITextFieldProps> = ({ name, buildData }) => {
  const { fieldsData, setInputValue, validateFieldInput } = useContext(FormContext);

  const onChange = (input: any) => {
    const validationError = buildData.validations.length ? validateFieldInput(buildData, input) : null;
    setInputValue(name, input, validationError);
  };

  return (
    <span>
      <input type="text" name={name} value={fieldsData[name] ? fieldsData[name].value : ""} onChange={e => onChange(e.target.value)} />
      {!fieldsData[name] ? null : <p>{fieldsData[name].error}</p>}
    </span>
  );
};
