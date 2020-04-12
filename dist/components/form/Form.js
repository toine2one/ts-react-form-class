var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useEffect, createContext } from "react";
export var FormContext = createContext({
    fieldsData: {},
    setInputValue: null,
    validateFieldInput: null,
    unpersistField: null,
    unpersistForm: null,
});
export var Form = function (_a) {
    var data = _a.data, children = _a.children, onFieldInput = _a.onFieldInput, formName = _a.formName;
    var _b = useState({}), fieldsData = _b[0], setFieldsData = _b[1];
    useEffect(function () {
        var getPersistedForm = function () {
            var storedForm = localStorage.getItem(formName);
            return storedForm ? JSON.parse(storedForm) : null;
        };
        var persistedFormData = getPersistedForm();
        if (persistedFormData) {
            for (var key in data) {
                if (persistedFormData[key] && data[key]) {
                    data[key].value = persistedFormData[key];
                }
            }
        }
        if (data) {
            setFieldsData(data);
        }
    }, [data, formName]);
    var validateFieldInput = function (fieldBuildData, input) {
        if (input === null || input === "")
            return null;
        for (var i = 0; i < fieldBuildData.validations.length; i++) {
            if (!fieldBuildData.validations[i].condition(input)) {
                return fieldBuildData.validations[i].errorMessage;
            }
        }
        return null;
    };
    var persistInLocalStorge = function (fieldProp, data) {
        var _a;
        var persistedFormData = localStorage.getItem(formName);
        if (persistedFormData) {
            var parsed = JSON.parse(persistedFormData);
            parsed[fieldProp] = data;
            localStorage.setItem(formName, JSON.stringify(parsed));
        }
        else {
            localStorage.setItem(formName, JSON.stringify((_a = {},
                _a[fieldProp] = data,
                _a)));
        }
    };
    var unpersistFormLocalStorage = function () {
        localStorage.removeItem(formName);
    };
    var unpersistFieldLocalStorage = function (fieldName) {
        var persistedFormData = localStorage.getItem(formName);
        var parsed = JSON.parse(persistedFormData);
        delete parsed[fieldName];
        localStorage.setItem(formName, JSON.stringify(parsed));
    };
    var setInputValue = function (fieldProp, input, validationError) {
        var _a;
        persistInLocalStorge(fieldProp, input);
        setFieldsData(__assign(__assign({}, fieldsData), (_a = {}, _a[fieldProp] = {
            value: input,
            error: validationError,
        }, _a)));
        onFieldInput(fieldProp, {
            error: "",
            value: input,
        });
    };
    return (React.createElement(FormContext.Provider, { value: {
            fieldsData: fieldsData,
            setInputValue: setInputValue,
            validateFieldInput: validateFieldInput,
            unpersistField: unpersistFieldLocalStorage,
            unpersistForm: unpersistFormLocalStorage,
        } }, children));
};
