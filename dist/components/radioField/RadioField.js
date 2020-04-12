import React from "react";
export var RadioField = function (_a) {
    var name = _a.name, buildData = _a.buildData, setInputValue = _a.setInputValue, data = _a.data;
    var onChange = function (input) {
        setInputValue(name, input);
    };
    return (React.createElement("div", null, buildData.options.map(function (opt) {
        return (React.createElement("span", { key: "radio-field-" + opt.value },
            React.createElement("input", { type: "radio", name: name, value: opt.value, onChange: function (e) { return onChange(e.target.value); }, checked: data ? "" + data.value === "" + opt.value : false }),
            React.createElement("label", null, opt.label),
            React.createElement("br", null)));
    })));
};
