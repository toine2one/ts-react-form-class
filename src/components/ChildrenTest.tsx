import React from "react";
import { FC } from "react";
import { IPersonInputModel, Gender, CarBrand } from "../Example";

interface ITestProps {
  children: (arg: IPersonInputModel) => any;
}

export const Test: FC<ITestProps> = ({ children }) => {
  return (
    <div>
      {children({
        firstName: "Toine",
        lastName: "koene",
        gender: Gender.Male,
        carBrand: CarBrand.BMW
      })}
    </div>
  );
};
