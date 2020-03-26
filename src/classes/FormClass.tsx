import { IFormFieldsBuildData, IForm, IField, IFields, ITextFieldBuildData } from "../interfaces/IForm";
import React, { Component } from "react";
import { Form } from "../components/form/Form";
import { TextField } from "../components/textField/TextField";

interface IFormClassState<T> {
  formData: T;
  formFields: any;
}

interface IFormClassProps<T> {
  children: (fields: T) => JSX.Element;
}

export const fieldMetadataKey = Symbol("formField");

export function getField(target: any, propertyKey: string) {
  return Reflect.getMetadata(fieldMetadataKey, target, propertyKey);
}

export abstract class FormClass<T> extends Component<IFormClassProps<T>, IFormClassState<T>> implements IForm<T> {
  abstract formName: string;
  formFieldsBuildData: IFormFieldsBuildData = {};

  abstract fetchData(): Promise<T>;
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
    this.getFormFieldsData();
    console.log(this.formFieldsBuildData);
    this.SetPropertiesToElements();
  }

  private toUniqueFieldProp(prop: string) {
    return `${this.formName}-${prop}`;
  }

  private getFormFieldsData = (): any => {
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

  private SetPropertiesToElements() {
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

  abstract buildForm(fields: T): JSX.Element;

  renderCustomBuildForm = () => {
    try {
      return this.buildForm(this.state.formFields);
    } catch (error) {
      return null;
    }
  };

  build = async (): Promise<void> => {
    this.formFieldsBuildData = this.getFormFieldsData();
    const initialData = await this.fetchData();
    this.setFormData(initialData);
    return Promise.resolve();
  };

  render = (): JSX.Element => {
    return (
      <div>
        <Form data={this.createFieldDataObjects()} FormClass={this}>
          {this.state.formFields ? this.props.children(this.state.formFields) : null}
        </Form>
      </div>
    );
  };
}
