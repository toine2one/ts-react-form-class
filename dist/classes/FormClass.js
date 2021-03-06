var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { Component } from "react";
import { TextField } from "../components/textField/TextField";
import { RadioField, SelectField } from "../exports";
export var fieldMetadataKey = Symbol("formField");
export function getFieldMetaData(target, propertyKey) {
    return Reflect.getMetadata(fieldMetadataKey, target, propertyKey);
}
var FormBuilder = /** @class */ (function (_super) {
    __extends(FormBuilder, _super);
    function FormBuilder(props) {
        var _this = _super.call(this, props) || this;
        _this.formFieldsBuildData = {};
        _this.onInputCb = null;
        _this.onInput = function (action) {
            _this.onInputCb = action;
        };
        _this.validateInput = function (fieldBuildData, input) {
            if (input === null || input === "")
                return null;
            for (var i = 0; i < fieldBuildData.validations.length; i++) {
                if (!fieldBuildData.validations[i].condition(input)) {
                    return fieldBuildData.validations[i].errorMessage;
                }
            }
            return null;
        };
        _this.setInputValue = function (fieldProp, input, validationError) {
            // persistInLocalStorge(fieldProp, input);
            var _a;
            _this.setState({
                inputData: __assign(__assign({}, _this.state.inputData), (_a = {}, _a[fieldProp] = {
                    value: input,
                    error: validationError,
                }, _a)),
            });
            if (_this.onInputCb) {
                _this.onInputCb(fieldProp, {
                    error: "",
                    value: input,
                });
            }
        };
        _this.GetMetaDataFromProperties = function () {
            var formFieldsBuildData = {};
            Object.keys(_this).forEach(function (key) {
                var fieldMetaData = getFieldMetaData(_this, key);
                if (fieldMetaData) {
                    formFieldsBuildData[key] = fieldMetaData;
                }
            });
            _this.formFieldsBuildData = formFieldsBuildData;
        };
        _this.resetFormInput = function () {
            var emptyInputData = {};
            for (var key in _this.state.inputData) {
                emptyInputData[key] = {
                    value: "",
                    error: "",
                };
            }
            _this.setState({
                inputData: emptyInputData,
            });
        };
        _this.createInputDataObjects = function () {
            var fields = {};
            for (var key in _this.formFieldsBuildData) {
                fields[key] = {
                    value: _this.state.formData[key] ? _this.state.formData[key] : "",
                    error: null,
                };
            }
            _this.setState({ inputData: fields });
        };
        _this.build = function () { return __awaiter(_this, void 0, void 0, function () {
            var initialData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.formName.length) {
                            throw Error("class property formName must contain a value");
                        }
                        return [4 /*yield*/, this.feedDataAsync()];
                    case 1:
                        initialData = _a.sent();
                        this.setFormData(initialData);
                        this.GetMetaDataFromProperties();
                        this.createInputDataObjects();
                        this.setState({ componentReady: true });
                        return [2 /*return*/, Promise.resolve()];
                }
            });
        }); };
        _this.fieldHasChangedCheck = function (serverValue, inputValue) {
            return serverValue !== inputValue;
        };
        _this.fieldHasErrorCheck = function (error) {
            if (error !== null && error !== undefined) {
                return error.length ? true : false;
            }
            else {
                return false;
            }
        };
        _this.setFieldPresentationValues = function (fieldPresentations, fieldsData) {
            for (var key in fieldPresentations) {
                if (fieldsData[key]) {
                    fieldPresentations[key].value = fieldsData[key].value;
                    fieldPresentations[key].error = fieldsData[key].error;
                    fieldPresentations[key].hasError = _this.fieldHasErrorCheck(fieldsData[key].error);
                    fieldPresentations[key].hasChanged = _this.state.formData[key]
                        ? _this.fieldHasChangedCheck(_this.state.formData[key], fieldsData[key].value)
                        : false;
                }
            }
            return fieldPresentations;
        };
        _this.onSubmitForm = function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.onSubmit(this.state.inputData)];
                    case 1:
                        result = _a.sent();
                        if (result.success) {
                            if (result.data) {
                                this.setFormData(result.data);
                            }
                            if (this.props.resetOnSubmit) {
                                this.resetFormInput();
                            }
                        }
                        if (result.successMessage) {
                            this.setState({ submitSuccessMessage: result.successMessage });
                        }
                        if (result.errorMessage) {
                            this.setState({ submitErrorMessage: result.errorMessage });
                        }
                        this.setState({ submitSuccess: result.success });
                        if (this.props.afterSubmit) {
                            this.props.afterSubmit(result);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.render = function () {
            return (React.createElement("div", null,
                React.createElement("div", null, _this.state.componentReady
                    ? _this.props.children({
                        fields: _this.setFieldPresentationValues(_this.createFieldPresentationObjects(), _this.state.inputData),
                        submitSuccessMessage: _this.state.submitSuccessMessage,
                        submitErrorMessage: _this.state.submitErrorMessage,
                        submitSuccess: _this.state.submitSuccess,
                        submitAction: function () {
                            _this.onSubmitForm();
                        },
                        submitActionButton: function (title) { return (React.createElement("button", { onClick: function (e) {
                                e.preventDefault();
                                _this.onSubmitForm();
                            } }, title)); },
                        resetButton: function (title) { return (React.createElement("button", { onClick: function (e) {
                                e.preventDefault();
                                _this.onSubmitForm();
                            } }, title)); },
                    })
                    : null)));
        };
        _this.state = {
            fieldPresentations: null,
            formOutput: null,
            formData: {},
            inputData: {},
            componentReady: false,
            submitSuccessMessage: null,
            submitErrorMessage: null,
            submitSuccess: null,
        };
        return _this;
    }
    FormBuilder.prototype.createFieldPresentationObjects = function () {
        var fieldsObj = {};
        if (this.formFieldsBuildData) {
            for (var key in this.formFieldsBuildData) {
                var fieldBuildData = this.formFieldsBuildData[key];
                switch (fieldBuildData.type) {
                    case "Text":
                        fieldBuildData = fieldBuildData;
                        fieldsObj[key] = {
                            label: fieldBuildData.label,
                            element: (React.createElement(TextField, { setInputValue: this.setInputValue, data: this.state.inputData[key], validateInput: this.validateInput, name: key, buildData: fieldBuildData })),
                        };
                        break;
                    case "Radio":
                        fieldBuildData = fieldBuildData;
                        fieldsObj[key] = {
                            label: fieldBuildData.label,
                            element: (React.createElement(RadioField, { data: this.state.inputData[key], setInputValue: this.setInputValue, name: key, buildData: fieldBuildData })),
                        };
                        break;
                    case "Select":
                        fieldBuildData = fieldBuildData;
                        fieldsObj[key] = {
                            label: fieldBuildData.label,
                            element: (React.createElement(SelectField, { data: this.state.inputData[key], setInputValue: this.setInputValue, name: key, buildData: fieldBuildData })),
                        };
                        break;
                }
            }
        }
        return fieldsObj;
    };
    FormBuilder.prototype.setFormData = function (formData) {
        if (formData) {
            this.setState({
                formData: formData,
            });
        }
    };
    FormBuilder.prototype.componentDidMount = function () {
        this.build();
    };
    return FormBuilder;
}(Component));
export { FormBuilder };
