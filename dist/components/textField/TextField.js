import React from "react";
export var TextField = function (_a) {
    var name = _a.name, buildData = _a.buildData, validateInput = _a.validateInput, data = _a.data, setInputValue = _a.setInputValue;
    var onChange = function (input) {
        var validationError = buildData.validations.length ? validateInput(buildData, input) : null;
        setInputValue(name, input, validationError);
    };
    return React.createElement("input", { type: "text", name: name, value: data ? data.value : "", onChange: function (e) { return onChange(e.target.value); } });
};
