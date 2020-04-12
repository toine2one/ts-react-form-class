import "reflect-metadata";
import { FormBuilder } from "./classes/FormClass";
import { IField } from "./interfaces/IForm";
export declare enum Gender {
    Male = 0,
    Female = 1
}
export declare enum CarBrand {
    Mercedes = 0,
    BMW = 1,
    Volvo = 2
}
export interface IPersonInputModel {
    firstName: string;
    lastName: string;
    gender: Gender;
    carBrand: CarBrand;
}
export declare class Example extends FormBuilder<IPersonInputModel> implements IPersonInputModel {
    formName: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    carBrand: CarBrand;
    feedDataAsync(): Promise<IPersonInputModel>;
    onInput(fieldName: string, data: IField): void;
    onSubmit(fields: any): Promise<boolean>;
}
