import React from "react";
import { Example } from "./Example";

function App() {
  return (
    <div className="App">
      <Example>
        {fields => {
          return (
            <div>
              <div>{fields.firstName}</div>
              <div>{fields.lastName}</div>
            </div>
          );
        }}
      </Example>
    </div>
  );
}

export default App;
