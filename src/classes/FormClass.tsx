import {
  IFormFieldsBuildData,
  IField,
  IFields,
  ITextFieldBuildData,
  IRadioFieldBuildData,
  ISelectBuildData,
} from "../interfaces/IForm";
import React, { Component } from "react";
import { Form, FormContext } from "../components/form/Form";
import { TextField } from "../components/textField/TextField";
import { RadioField } from "../components/radioField/RadioField";
import { SelectField } from "../components/selectField/SelectField";

interface IFormBuilderState<T> {
  formData: any;
  formOutput: IFormPresentation<T>;
  fieldPresentations: { [P in keyof T]: IFieldPresentation };
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
}

interface IFormBuilderProps<T> {
  children: (formValues: IFormPresentation<T>) => JSX.Element;
}

export const fieldMetadataKey = Symbol("formField");

export function getFieldMetaData(target: any, propertyKey: string) {
  return Reflect.getMetadata(fieldMetadataKey, target, propertyKey);
}

export abstract class FormBuilder<T> extends Component<IFormBuilderProps<T>, IFormBuilderState<T>> {
  abstract formName: string;
  private formFieldsBuildData: IFormFieldsBuildData = {};

  abstract feedDataAsync(): Promise<T>;
  abstract onInput?(fieldName: string, data: IField): void;
  abstract onSubmit(fields: {}): Promise<boolean>;

  constructor(props: any) {
    super(props);
    this.state = {
      fieldPresentations: null,
      formOutput: null,
      formData: null,
    };
  }

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

  private createFieldPresentationObjects() {
    const fieldsObj: { [key: string]: IFieldPresentation } = {};

    if (this.formFieldsBuildData) {
      for (let key in this.formFieldsBuildData) {
        let fieldBuildData = this.formFieldsBuildData[key];
        switch (fieldBuildData.type) {
          case "Text":
            fieldBuildData = fieldBuildData as ITextFieldBuildData;
            fieldsObj[key] = {
              label: fieldBuildData.label,
              element: <TextField name={key} buildData={fieldBuildData} />,
            };
            break;
          case "Radio":
            fieldBuildData = fieldBuildData as IRadioFieldBuildData;
            fieldsObj[key] = {
              label: fieldBuildData.label,
              element: <RadioField name={key} buildData={fieldBuildData} />,
            };
            break;
          case "Select":
            fieldBuildData = fieldBuildData as ISelectBuildData;
            fieldsObj[key] = {
              label: fieldBuildData.label,
              element: <SelectField name={key} buildData={fieldBuildData} />,
            };
            break;
        }
      }
    }

    this.setState({
      fieldPresentations: {
        ...this.state.fieldPresentations,
        ...fieldsObj,
      },
    });
  }

  private createFieldDataObjects = (): IFields => {
    const fields: IFields = {};

    for (let key in this.state.formData) {
      fields[key] = {
        value: this.state.formData[key],
        error: null,
      };
    }
    return fields;
  };

  protected setFormData(formData: T) {
    this.setState({
      formData,
    });
  }

  build = async (): Promise<void> => {
    this.GetMetaDataFromProperties();
    this.createFieldPresentationObjects();
    const initialData = await this.feedDataAsync();
    this.setFormData(initialData);
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
        fieldPresentations[key].hasChanged = this.fieldHasChangedCheck(this.state.formData[key], fieldsData[key].value);
      }
    }
    return fieldPresentations;
  };

  render = (): JSX.Element => {
    return (
      <div>
        <Form formName={this.formName} data={this.createFieldDataObjects()} onFieldInput={this.onInput}>
          <FormContext.Consumer>
            {({ fieldsData, unpersistForm }) => {
              return (
                <div>
                  {this.state.fieldPresentations
                    ? this.props.children({
                        fields: this.setFieldPresentationValues(this.state.fieldPresentations, fieldsData),
                        submitAction: () => {
                          this.onSubmit(fieldsData);
                        },
                        submitActionButton: (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              this.onSubmit(fieldsData).then((success) => {
                                if (success) unpersistForm();
                              });
                            }}>
                            Submit
                          </button>
                        ),
                      })
                    : null}
                </div>
              );
            }}
          </FormContext.Consumer>
        </Form>
      </div>
    );
  };
}
