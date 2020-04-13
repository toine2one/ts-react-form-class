import React from "react";
import { Example } from "./Example";
import "./App.css";
function App() {
    return (React.createElement("div", { className: "App" },
        React.createElement(Example, { resetOnSubmit: true }, function (_a) {
            var fields = _a.fields, submitActionButton = _a.submitActionButton, submitSuccessMessage = _a.submitSuccessMessage, resetButton = _a.resetButton;
            var firstName = fields.firstName, lastName = fields.lastName, gender = fields.gender, carBrand = fields.carBrand;
            return (React.createElement("div", null,
                React.createElement("div", null, firstName.label),
                React.createElement("div", { className: firstName.hasChanged ? "input-changed" : "" }, firstName.element),
                React.createElement("div", null, firstName.error),
                React.createElement("div", { className: lastName.hasChanged ? "input-changed" : "" }, lastName.element),
                React.createElement("div", null, lastName.error),
                React.createElement("div", null, gender.element),
                React.createElement("div", null, carBrand.element),
                React.createElement("div", null, submitActionButton("submit")),
                React.createElement("div", null, submitSuccessMessage),
                React.createElement("div", null, resetButton("Reset here"))));
        })));
}
export default App;
