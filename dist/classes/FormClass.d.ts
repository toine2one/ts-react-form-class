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
    submitActionButton: JSX.Element;
}
interface IFormBuilderProps<T> {
    children: (formValues: IFormPresentation<T>) => JSX.Element;
}
export declare const fieldMetadataKey: unique symbol;
export declare function getFieldMetaData(target: any, propertyKey: string): any;
export declare abstract class FormBuilder<T> extends Component<IFormBuilderProps<T>, IFormBuilderState<T>> {
    abstract formName: string;
    private formFieldsBuildData;
    abstract feedDataAsync(): Promise<T>;
    abstract onInput?(fieldName: string, data: IField): void;
    abstract onSubmit(fields: {}): Promise<boolean>;
    constructor(props: any);
    private validateInput;
    setInputValue: (fieldProp: string, input: any, validationError?: string) => void;
    private GetMetaDataFromProperties;
    createFieldPresentationObjects(): {
        [P in keyof T]: IFieldPresentation;
    };
    private createInputDataObjects;
    protected setFormData(formData: T): void;
    build: () => Promise<void>;
    componentDidMount(): void;
    fieldHasChangedCheck: (serverValue: any, inputValue: any) => boolean;
    fieldHasErrorCheck: (error: string) => boolean;
    setFieldPresentationValues: (fieldPresentations: { [P in keyof T]: IFieldPresentation; }, fieldsData: IFields) => { [P in keyof T]: IFieldPresentation; };
    render: () => JSX.Element;
}
export {};
