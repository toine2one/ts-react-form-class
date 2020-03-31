export type FieldType = "Text" | "TextArea" | "Radio" | "Select";

export interface IField {
  value: any;
  error: string;
}

export interface IFields {
  [key: string]: IField;
}

export interface IValidation {
  condition: (input: any) => boolean;
  errorMessage?: string;
}

export interface ITextFieldBuildData {
  type: FieldType;
  label: string;
  validations: IValidation[];
}

export interface IRadioOption {
  label: string;
  value: string | number;
}

export interface IRadioFieldBuildData {
  type: FieldType;
  label: string;
  options: IRadioOption[];
}

export interface ISelectOption {
  label: string;
  value: string | number;
}

export interface ISelectBuildData {
  type: FieldType;
  label: string;
  options: ISelectOption[];
}

export interface IFormFieldsBuildData {
  [key: string]: ITextFieldBuildData | IRadioFieldBuildData;
}

export interface IForm<T = any> {
  formName: string;
  formFieldsBuildData: IFormFieldsBuildData;
  build(): Promise<void>;
  onInput(fieldName: string, data: IField): void;
  onSubmit(fields: T): Promise<boolean>;
  feedDataAsync(): Promise<T>;
}
