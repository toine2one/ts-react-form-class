import {
  IFormFieldsBuildData,
  IForm,
  IField,
  IFields,
  ITextFieldBuildData,
  IRadioFieldBuildData
} from "../interfaces/IForm";
import React, { Component } from "react";
import { Form } from "../components/form/Form";
import { TextField } from "../components/textField/TextField";
import { RadioField } from "../components/radioField/RadioField";

interface IFormClassState<T> {
  formData: T;
  formFields: any;
}

interface IFormValues<T> {
  fields: T;
  submitBtn: JSX.Element;
}

interface IFormClassProps<T> {
  children: (formValues: IFormValues<T>) => JSX.Element;
}

export const fieldMetadataKey = Symbol("formField");

export function getField(target: any, propertyKey: string) {
  return Reflect.getMetadata(fieldMetadataKey, target, propertyKey);
}

export abstract class FormClass<T> extends Component<IFormClassProps<T>, IFormClassState<T>> implements IForm<T> {
  abstract formName: string;
  formFieldsBuildData: IFormFieldsBuildData = {};

  abstract feedDataAsync(): Promise<T>;
  abstract onInput(fieldName: string, data: IField): void;
  abstract onSubmit(fields: T): Promise<boolean>;

  constructor(props: any) {
    super(props);
    this.state = {
      formData: null,
      formFields: null
    };
  }

  componentDidMount() {
    this.getFormFieldsBuildData();
    this.assignElementsToProperties();
  }

  private toUniqueFieldProp(prop: string) {
    return `${this.formName}-${prop}`;
  }

  private getFormFieldsBuildData = (): any => {
    const formFieldsBuildData: IFormFieldsBuildData = {};

    Object.keys(this).forEach(key => {
      const fieldMetaData = getField(this, key);
      if (fieldMetaData) {
        formFieldsBuildData[this.toUniqueFieldProp(key)] = fieldMetaData;
      }
    });

    this.formFieldsBuildData = formFieldsBuildData;
    return formFieldsBuildData;
  };

  private assignElementsToProperties() {
    const fieldsObj: any = {};
    Object.keys(this).forEach(key => {
      const fieldMetaData = getField(this, key);

      if (fieldMetaData) {
        let fieldBuildData = this.formFieldsBuildData[this.toUniqueFieldProp(key)];
        switch (fieldBuildData.type) {
          case "Text":
            fieldBuildData = fieldBuildData as ITextFieldBuildData;
            fieldsObj[key] = this.renderTextInputElement(this.toUniqueFieldProp(key), fieldBuildData);
            break;
          case "Radio":
            fieldBuildData = fieldBuildData as IRadioFieldBuildData;
            fieldsObj[key] = this.renderRadioInputElement(this.toUniqueFieldProp(key), fieldBuildData);
            break;
        }
      }
    });
    this.setState({
      formFields: fieldsObj
    });
  }

  renderTextInputElement(uniqueKey: string, buildData: ITextFieldBuildData): JSX.Element {
    return (
      <div>
        <label>{buildData.label}</label>
        <TextField name={uniqueKey} buildData={buildData} />
      </div>
    );
  }

  renderRadioInputElement(uniqueKey: string, buildData: IRadioFieldBuildData): JSX.Element {
    console.log(buildData);
    return (
      <div>
        <label>{buildData.label}</label>
        <RadioField name={uniqueKey} options={buildData.options} />
      </div>
    );
  }

  private createFieldDataObjects = (): IFields => {
    const fields: IFields = {};
    for (let key in this.state.formData) {
      fields[this.toUniqueFieldProp(key)] = {
        value: this.state.formData[key],
        error: null
      };
    }
    return fields;
  };

  protected setFormData(formData: T) {
    this.setState({
      formData
    });
  }

  build = async (): Promise<void> => {
    this.formFieldsBuildData = this.getFormFieldsBuildData();
    const initialData = await this.feedDataAsync();
    this.setFormData(initialData);
    return Promise.resolve();
  };

  render = (): JSX.Element => {
    return (
      <div>
        <Form data={this.createFieldDataObjects()} FormClass={this}>
          {this.state.formFields
            ? this.props.children({
                fields: this.state.formFields,
                submitBtn: <button onClick={() => this.onSubmit(this.state.formFields)}>Submit</button>
              })
            : null}
        </Form>
      </div>
    );
  };
}
