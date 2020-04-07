import React from "react";
import { Example } from "./Example";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Example>
        {({ fields, submitActionButton }) => {
          const { firstName, lastName, gender, carBrand } = fields;
          return (
            <div>
              <div>{firstName.label}</div>
              <div className={firstName.hasChanged ? "input-changed" : ""}>{firstName.element}</div>
              <div>{firstName.hasChanged ? "Changed" : null}</div>
              <div>{firstName.error}</div>
              <div>{lastName.element}</div>
              <div>{gender.element}</div>
              <div>{carBrand.element}</div>
              <div>{submitActionButton}</div>
            </div>
          );
        }}
      </Example>
    </div>
  );
}

export default App;
