import "reflect-metadata";
import { FormBuilder, ISubmit } from "./classes/FormClass";
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
    constructor(props: any);
    firstName: string;
    lastName: string;
    gender: Gender;
    carBrand: CarBrand;
    feedDataAsync(): Promise<IPersonInputModel>;
    onSubmit(fields: any): Promise<ISubmit<IPersonInputModel>>;
}
