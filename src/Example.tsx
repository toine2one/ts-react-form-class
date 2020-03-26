import "reflect-metadata";
import { textField } from "./decorators/TextField";
import { FormClass } from "./classes/FormClass";
import { IField } from "./interfaces/IForm";
import { radioField } from "./decorators/RadioField";
import { selectField } from "./decorators/SelectField";

export enum Gender {
  Male,
  Female
}

export enum CarBrand {
  Mercedes,
  BMW,
  Volvo
}

export interface IPersonInputModel {
  firstName: string;
  lastName: string;
  gender: Gender;
  carBrand: CarBrand;
}

export class Example extends FormClass<IPersonInputModel> implements IPersonInputModel {
  formName: string = "ExampleForm";

  @textField({
    type: "Text",
    label: "First name:",
    validations: [
      {
        condition: (input: string) => input.length > 3,
        errorMessage: "length needs to be higher than 3"
      }
    ]
  })
  firstName: string;

  @textField({
    type: "Text",
    label: "Last name:",
    validations: [
      {
        condition: (input: string) => input.length > 2,
        errorMessage: "length needs to be higher than 2 "
      }
    ]
  })
  lastName: string;

  @radioField({
    type: "Radio",
    label: "Gender:",
    options: [
      {
        label: "Male",
        value: Gender.Male
      },
      {
        label: "Female",
        value: Gender.Female
      }
    ]
  })
  gender: Gender;

  @selectField({
    label: "Car brand:",
    type: "Select",
    options: [
      {
        label: "Mercedes",
        value: CarBrand.Mercedes
      },
      {
        label: "BMW",
        value: CarBrand.BMW
      },
      {
        label: "Volvo",
        value: CarBrand.Volvo
      }
    ]
  })
  carBrand: CarBrand;

  fetchData(): Promise<IPersonInputModel> {
    const mockData = {
      firstName: "Toine",
      lastName: "koene",
      gender: Gender.Male,
      carBrand: CarBrand.BMW
    };
    return Promise.resolve(mockData);
  }

  onInput(fieldName: string, data: IField): void {
    console.log(fieldName, data);
  }

  async onSubmit(fields: IPersonInputModel): Promise<boolean> {
    const newData = await this.fetchData();
    this.setState({
      formData: newData
    });
    return Promise.resolve(true);
  }

  buildForm(fields: IPersonInputModel): JSX.Element {
    throw new Error("Method not implemented.");
  }
}
