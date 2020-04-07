import React, { FC, useState, useEffect, createContext } from "react";
import { ITextFieldBuildData, IFields, IField } from "../../interfaces/IForm";

interface IFormProps {
  data: IFields;
  onFieldInput: (fieldName: string, data: IField) => void;
  formName: string;
}

export interface IFormContextProps {
  fieldsData: IFields;
  setInputValue: (fieldProp: string, input: any, validationError?: string) => void;
  validateFieldInput(fieldBuildData: ITextFieldBuildData, input: any): string;
  unpersistField: (fieldName: string) => void;
  unpersistForm: () => void;
}

export const FormContext = createContext<IFormContextProps>({
  fieldsData: {},
  setInputValue: null,
  validateFieldInput: null,
  unpersistField: null,
  unpersistForm: null,
});

export const Form: FC<IFormProps> = ({ data, children, onFieldInput, formName }) => {
  const [fieldsData, setFieldsData] = useState<IFields>({});

  useEffect(() => {
    const getPersistedForm = () => {
      const storedForm = localStorage.getItem(formName);
      return storedForm ? JSON.parse(storedForm) : null;
    };

    const persistedFormData = getPersistedForm();
    if (persistedFormData) {
      for (let key in data) {
        if (persistedFormData[key] && data[key]) {
          data[key].value = persistedFormData[key];
        }
      }
    }

    if (data) {
      setFieldsData(data);
    }
  }, [data, formName]);

  const validateFieldInput = (fieldBuildData: ITextFieldBuildData, input: any): string => {
    if (input === null || input === "") return null;

    for (let i = 0; i < fieldBuildData.validations.length; i++) {
      if (!fieldBuildData.validations[i].condition(input)) {
        return fieldBuildData.validations[i].errorMessage;
      }
    }

    return null;
  };

  const persistInLocalStorge = (fieldProp: string, data: any) => {
    const persistedFormData = localStorage.getItem(formName);
    if (persistedFormData) {
      const parsed = JSON.parse(persistedFormData);
      parsed[fieldProp] = data;
      localStorage.setItem(formName, JSON.stringify(parsed));
    } else {
      localStorage.setItem(
        formName,
        JSON.stringify({
          [fieldProp]: data,
        })
      );
    }
  };

  const unpersistFormLocalStorage = () => {
    localStorage.removeItem(formName);
  };

  const unpersistFieldLocalStorage = (fieldName: string) => {
    const persistedFormData = localStorage.getItem(formName);
    const parsed = JSON.parse(persistedFormData);
    delete parsed[fieldName];
    localStorage.setItem(formName, JSON.stringify(parsed));
  };

  const setInputValue = (fieldProp: string, input: any, validationError?: string) => {
    persistInLocalStorge(fieldProp, input);

    setFieldsData({
      ...fieldsData,
      [fieldProp]: {
        value: input,
        error: validationError,
      },
    });

    onFieldInput(fieldProp, {
      error: "",
      value: input,
    });
  };

  return (
    <FormContext.Provider
      value={{
        fieldsData,
        setInputValue,
        validateFieldInput,
        unpersistField: unpersistFieldLocalStorage,
        unpersistForm: unpersistFormLocalStorage,
      }}>
      {children}
    </FormContext.Provider>
  );
};
