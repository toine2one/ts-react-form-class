import React from "react";
import { Example } from "./Example";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Example resetOnSubmit={true}>
        {({ fields, submitActionButton, submitSuccessMessage, resetButton }) => {
          const { firstName, lastName, gender, carBrand } = fields;
          return (
            <div>
              <div>{firstName.label}</div>
              <div className={firstName.hasChanged ? "input-changed" : ""}>{firstName.element}</div>
              <div>{firstName.error}</div>
              <div className={lastName.hasChanged ? "input-changed" : ""}>{lastName.element}</div>
              <div>{lastName.error}</div>
              <div>{gender.element}</div>
              <div>{carBrand.element}</div>
              <div>{submitActionButton("submit")}</div>
              <div>{submitSuccessMessage}</div>
              <div>{resetButton("Reset here")}</div>
            </div>
          );
        }}
      </Example>
    </div>
  );
}

export default App;
