import { IField, IFields } from "../interfaces/IForm";
import { Component } from "react";
interface IFormBuilderState<T> {
    formData: any;
    formOutput: IFormPresentation<T>;
    fieldPresentations: {
        [P in keyof T]: IFieldPresentation;
    };
    inputData: IFields;
    componentReady: boolean;
    submitSuccessMessage: string;
    submitErrorMessage: string;
    submitSuccess: boolean;
}
interface IFormBuilderProps<T> {
    children: (formValues: IFormPresentation<T>) => JSX.Element;
    resetOnSubmit: boolean;
    afterSubmit?: (result: ISubmit<T>) => void;
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
    fields: {
        [P in keyof T]: IFieldPresentation;
    };
    submitAction: Function;
    submitActionButton: (title: string) => JSX.Element;
    resetButton: (title: string) => JSX.Element;
    submitSuccessMessage: string;
    submitErrorMessage: string;
    submitSuccess: boolean;
}
export interface ISubmit<T> {
    success: boolean;
    errorMessage?: string;
    successMessage?: string;
    data?: T;
}
export declare const fieldMetadataKey: unique symbol;
export declare function getFieldMetaData(target: any, propertyKey: string): any;
export declare abstract class FormBuilder<T> extends Component<IFormBuilderProps<T>, IFormBuilderState<T>> {
    abstract formName: string;
    private formFieldsBuildData;
    private onInputCb;
    abstract feedDataAsync(): Promise<T>;
    abstract onSubmit(fields: {}): Promise<ISubmit<T>>;
    constructor(props: any);
    protected onInput: (action: (fieldName: string, data: IField) => void) => void;
    private validateInput;
    setInputValue: (fieldProp: string, input: any, validationError?: string) => void;
    private GetMetaDataFromProperties;
    createFieldPresentationObjects(): {
        [P in keyof T]: IFieldPresentation;
    };
    protected resetFormInput: () => void;
    private createInputDataObjects;
    protected setFormData(formData: T): void;
    build: () => Promise<void>;
    componentDidMount(): void;
    fieldHasChangedCheck: (serverValue: any, inputValue: any) => boolean;
    fieldHasErrorCheck: (error: string) => boolean;
    setFieldPresentationValues: (fieldPresentations: { [P in keyof T]: IFieldPresentation; }, fieldsData: IFields) => { [P in keyof T]: IFieldPresentation; };
    private onSubmitForm;
    render: () => JSX.Element;
}
export {};
