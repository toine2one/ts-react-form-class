import React, { FC, useState, useEffect, createContext } from "react";
import { IForm, IFormFieldsBuildData, ITextFieldBuildData, IFields, IRadioFieldBuildData, ISelectBuildData } from "../../interfaces/IForm";
import { TextField } from "../textField/TextField";
import { RadioField } from "../radioField/RadioField";
import { SelectField } from "../selectField/SelectField";

interface IFormProps {
  FormClass: IForm;
  data: IFields;
  autoBuild?: boolean;
}

export interface IFormContextProps {
  fieldsData: IFields;
  setInputValue: (fieldProp: string, input: any, validationError?: string) => void;
  onSubmit?: (fieldsData: IFields) => Promise<boolean>;
  fieldsToOriginalProps: (buildData: IFields) => IFields;
  resetFields: () => void;
  validateFieldInput(fieldBuildData: ITextFieldBuildData, input: any): string;
}

export const FormContext = createContext<IFormContextProps>({
  fieldsData: {},
  setInputValue: null,
  fieldsToOriginalProps: null,
  resetFields: null,
  validateFieldInput: null
});

export const Form: FC<IFormProps> = ({ FormClass, data, children, autoBuild }) => {
  const [init, setinit] = useState<boolean>(false);
  const [fieldsData, setFieldsData] = useState<IFields>({});
  const [fields, setFields] = useState<IFormFieldsBuildData>({});
  const [formClass, setformClass] = useState<IForm>(null);

  useEffect(() => {
    if (!init) {
      FormClass.build().then(() => {
        setFields(FormClass.formFieldsBuildData);
        setinit(true);
        setformClass(FormClass);
      });
    }

    if (data) {
      setFieldsData(data);
    }
  }, [FormClass, fieldsData, formClass, init, data]);

  const toOriginalPropName = (uniqueName: string) => {
    const orgNameSplit = uniqueName.split("-");
    if (orgNameSplit.length) {
      return orgNameSplit[orgNameSplit.length - 1];
    } else {
      return uniqueName;
    }
  };

  const fieldsToOriginalProps = (buildData: IFields) => {
    const convertedBuildData: IFields = {};
    for (let key in buildData) {
      convertedBuildData[toOriginalPropName(key)] = {
        ...buildData[key]
      };
    }
    return convertedBuildData;
  };

  const resetFields = () => {
    const fieldsToEmpty = { ...fieldsData };
    for (let key in fieldsToEmpty) {
      fieldsToEmpty[key].value = "";
    }
    setFieldsData(fieldsToEmpty);
  };

  const validateFieldInput = (fieldBuildData: ITextFieldBuildData, input: any): string => {
    if (input === null || input === "") return null;

    for (let i = 0; i < fieldBuildData.validations.length; i++) {
      if (!fieldBuildData.validations[i].condition(input)) {
        return fieldBuildData.validations[i].errorMessage;
      }
    }

    return null;
  };

  const setInputValue = (fieldProp: string, input: any, validationError?: string) => {
    const field = fieldsData[fieldProp];

    if (!field) {
      setFieldsData({
        ...fieldsData,
        [fieldProp]: {
          value: input,
          error: validationError
        }
      });
    } else {
      field.value = input;
      field.error = validationError;
      setFieldsData({
        ...fieldsData,
        [fieldProp]: field
      });
    }

    formClass.onInput(toOriginalPropName(fieldProp), { value: input, error: validationError });
  };

  const renderFields = (): JSX.Element[] => {
    const fieldElements: JSX.Element[] = [];
    let field = null;

    for (let key in fields) {
      switch (fields[key].type) {
        case "Text":
          field = fields[key] as ITextFieldBuildData;
          fieldElements.push(
            <div key={`field-${key}`}>
              <label htmlFor={key}>{field.label}</label>
              <TextField name={key} buildData={field} />
              {!fieldsData[key] ? null : <p>{fieldsData[key].error}</p>}
            </div>
          );
          break;
        case "Radio":
          field = fields[key] as IRadioFieldBuildData;
          fieldElements.push(
            <div key={`field-${key}`}>
              <label htmlFor={key}>{field.label}</label>
              <RadioField name={key} options={field.options} />
              {!fieldsData[key] ? null : <p>{fieldsData[key].error}</p>}
            </div>
          );
          break;
        case "Select":
          field = fields[key] as ISelectBuildData;
          fieldElements.push(
            <div key={`field-${key}`}>
              <label htmlFor={key}>{field.label}</label>
              <SelectField name={key} options={field.options} />
              {!fieldsData[key] ? null : <p>{fieldsData[key].error}</p>}
            </div>
          );
      }
    }
    return fieldElements;
  };

  return (
    <FormContext.Provider
      value={{
        fieldsData,
        setInputValue,
        validateFieldInput,
        onSubmit: formClass ? formClass.onSubmit.bind(formClass) : null,
        fieldsToOriginalProps,
        resetFields
      }}
    >
      <div>{autoBuild ? renderFields() : children}</div>
    </FormContext.Provider>
  );
};
