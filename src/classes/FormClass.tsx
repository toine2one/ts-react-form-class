import {
  IFormFieldsBuildData,
  IField,
  IFields,
  ITextFieldBuildData,
  IRadioFieldBuildData,
  ISelectBuildData,
} from "../interfaces/IForm";
import React, { Component } from "react";
import { TextField } from "../components/textField/TextField";
import { RadioField, SelectField } from "../exports";

interface IFormBuilderState<T> {
  formData: any;
  formOutput: IFormPresentation<T>;
  fieldPresentations: { [P in keyof T]: IFieldPresentation };
  inputData: IFields;
  componentReady: boolean;
  submitSuccessMessage: string;
  submitErrorMessage: string;
  submitSuccess: boolean;
}

interface IFieldPresentation {
  label: string;
  value?: string | number;
  error?: string;
  element: JSX.Element;
  hasChanged?: boolean;
  hasError?: boolean;
}

interface IFormPresentation<T> {
  fields: { [P in keyof T]: IFieldPresentation };
  submitAction: Function;
  submitActionButton: JSX.Element;
  submitSuccessMessage: string;
  submitErrorMessage: string;
  submitSuccess: boolean;
}

interface IFormBuilderProps<T> {
  children: (formValues: IFormPresentation<T>) => JSX.Element;
}

export interface ISubmit<T> {
  success: boolean;
  errorMessage?: string;
  successMessage?: string;
  data?: T;
}

export const fieldMetadataKey = Symbol("formField");

export function getFieldMetaData(target: any, propertyKey: string) {
  return Reflect.getMetadata(fieldMetadataKey, target, propertyKey);
}

export abstract class FormBuilder<T> extends Component<IFormBuilderProps<T>, IFormBuilderState<T>> {
  abstract formName: string;
  private formFieldsBuildData: IFormFieldsBuildData = {};
  private onInputCb: (fieldName: string, data: IField) => void = null;

  abstract feedDataAsync(): Promise<T>;

  abstract onSubmit(fields: {}): Promise<ISubmit<T>>;

  constructor(props: any) {
    super(props);
    this.state = {
      fieldPresentations: null,
      formOutput: null,
      formData: {},
      inputData: {},
      componentReady: false,
      submitSuccessMessage: null,
      submitErrorMessage: null,
      submitSuccess: null,
    };
  }

  protected onInput = (action: (fieldName: string, data: IField) => void): void => {
    this.onInputCb = action;
  };

  private validateInput = (fieldBuildData: ITextFieldBuildData, input: any): string => {
    if (input === null || input === "") return null;

    for (let i = 0; i < fieldBuildData.validations.length; i++) {
      if (!fieldBuildData.validations[i].condition(input)) {
        return fieldBuildData.validations[i].errorMessage;
      }
    }

    return null;
  };

  setInputValue = (fieldProp: string, input: any, validationError?: string) => {
    // persistInLocalStorge(fieldProp, input);

    this.setState({
      inputData: {
        ...this.state.inputData,
        [fieldProp]: {
          value: input,
          error: validationError,
        },
      },
    });

    if (this.onInputCb) {
      this.onInputCb(fieldProp, {
        error: "",
        value: input,
      });
    }
  };

  private GetMetaDataFromProperties = (): any => {
    const formFieldsBuildData: IFormFieldsBuildData = {};

    Object.keys(this).forEach((key) => {
      const fieldMetaData = getFieldMetaData(this, key);
      if (fieldMetaData) {
        formFieldsBuildData[key] = fieldMetaData;
      }
    });

    this.formFieldsBuildData = formFieldsBuildData;
  };

  createFieldPresentationObjects(): { [P in keyof T]: IFieldPresentation } {
    const fieldsObj: any = {};

    if (this.formFieldsBuildData) {
      for (let key in this.formFieldsBuildData) {
        let fieldBuildData = this.formFieldsBuildData[key];
        switch (fieldBuildData.type) {
          case "Text":
            fieldBuildData = fieldBuildData as ITextFieldBuildData;
            fieldsObj[key] = {
              label: fieldBuildData.label,
              element: (
                <TextField
                  setInputValue={this.setInputValue}
                  data={this.state.inputData[key]}
                  validateInput={this.validateInput}
                  name={key}
                  buildData={fieldBuildData}
                />
              ),
            };
            break;
          case "Radio":
            fieldBuildData = fieldBuildData as IRadioFieldBuildData;
            fieldsObj[key] = {
              label: fieldBuildData.label,
              element: (
                <RadioField
                  data={this.state.inputData[key]}
                  setInputValue={this.setInputValue}
                  name={key}
                  buildData={fieldBuildData}
                />
              ),
            };
            break;
          case "Select":
            fieldBuildData = fieldBuildData as ISelectBuildData;
            fieldsObj[key] = {
              label: fieldBuildData.label,
              element: (
                <SelectField
                  data={this.state.inputData[key]}
                  setInputValue={this.setInputValue}
                  name={key}
                  buildData={fieldBuildData}
                />
              ),
            };
            break;
        }
      }
    }

    return fieldsObj;
  }

  private createInputDataObjects = (): void => {
    const fields: IFields = {};

    for (let key in this.formFieldsBuildData) {
      fields[key] = {
        value: this.state.formData[key] ? this.state.formData[key] : null,
        error: null,
      };
    }
    this.setState({ inputData: fields });
  };

  protected setFormData(formData: T) {
    if (formData) {
      this.setState({
        formData,
      });
    }
  }

  build = async (): Promise<void> => {
    const initialData = await this.feedDataAsync();
    this.setFormData(initialData);
    this.GetMetaDataFromProperties();
    this.createInputDataObjects();
    // this.createFieldPresentationObjects();
    this.setState({ componentReady: true });
    return Promise.resolve();
  };

  componentDidMount() {
    this.build();
  }

  fieldHasChangedCheck = (serverValue: any, inputValue: any): boolean => {
    return serverValue !== inputValue;
  };

  fieldHasErrorCheck = (error: string): boolean => {
    if (error !== null && error !== undefined) {
      return error.length ? true : false;
    } else {
      return false;
    }
  };

  setFieldPresentationValues = (fieldPresentations: { [P in keyof T]: IFieldPresentation }, fieldsData: IFields) => {
    for (let key in fieldPresentations) {
      if (fieldsData[key]) {
        fieldPresentations[key].value = fieldsData[key].value;
        fieldPresentations[key].error = fieldsData[key].error;
        fieldPresentations[key].hasError = this.fieldHasErrorCheck(fieldsData[key].error);
        fieldPresentations[key].hasChanged = this.state.formData[key]
          ? this.fieldHasChangedCheck(this.state.formData[key], fieldsData[key].value)
          : false;
      }
    }
    return fieldPresentations;
  };

  private onSubmitForm = async () => {
    const result = await this.onSubmit(this.state.inputData);
    if (result.success && result.data) {
      this.setFormData(result.data);
    }
    if (result.successMessage) {
      this.setState({ submitSuccessMessage: result.successMessage });
    }
    if (result.errorMessage) {
      this.setState({ submitErrorMessage: result.errorMessage });
    }
    this.setState({ submitSuccess: result.success });
  };

  render = (): JSX.Element => {
    return (
      <div>
        <div>
          {this.state.componentReady
            ? this.props.children({
                fields: this.setFieldPresentationValues(this.createFieldPresentationObjects(), this.state.inputData),
                submitSuccessMessage: this.state.submitSuccessMessage,
                submitErrorMessage: this.state.submitErrorMessage,
                submitSuccess: this.state.submitSuccess,
                submitAction: () => {
                  this.onSubmitForm();
                },
                submitActionButton: (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      this.onSubmitForm();
                    }}>
                    Submit
                  </button>
                ),
              })
            : null}
        </div>
      </div>
    );
  };
}
