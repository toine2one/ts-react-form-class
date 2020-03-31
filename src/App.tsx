import React from "react";
import { Example } from "./Example";

function App() {
  return (
    <div className="App">
      <Example>
        {({ fields, submitBtn }) => {
          return (
            <div>
              <div>{fields.firstName}</div>
              <div>{fields.gender}</div>
              <div>{submitBtn}</div>
            </div>
          );
        }}
      </Example>
    </div>
  );
}

export default App;
