import React from "react";
export var SelectField = function (_a) {
    var name = _a.name, buildData = _a.buildData, data = _a.data, setInputValue = _a.setInputValue;
    var onChange = function (input) {
        setInputValue(name, input);
    };
    Symbol("Example-form");
    return (React.createElement("div", null,
        React.createElement("select", { value: data ? data.value : "", onChange: function (e) { return onChange(e.target.value); } }, buildData.options.map(function (opt) {
            return (React.createElement("option", { key: "field-option-" + opt.value, value: opt.value }, opt.label));
        }))));
};
