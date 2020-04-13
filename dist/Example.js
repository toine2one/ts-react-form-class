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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
import "reflect-metadata";
import { textField } from "./decorators/TextField";
import { FormBuilder } from "./classes/FormClass";
import { radioField } from "./decorators/RadioField";
import { selectField } from "./decorators/SelectField";
export var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
export var CarBrand;
(function (CarBrand) {
    CarBrand[CarBrand["Mercedes"] = 0] = "Mercedes";
    CarBrand[CarBrand["BMW"] = 1] = "BMW";
    CarBrand[CarBrand["Volvo"] = 2] = "Volvo";
})(CarBrand || (CarBrand = {}));
var Example = /** @class */ (function (_super) {
    __extends(Example, _super);
    function Example(props) {
        var _this = _super.call(this, props) || this;
        _this.formName = "Example-form";
        _this.onInput(function (fieldName, data) {
            console.log(fieldName, data);
        });
        return _this;
    }
    Example.prototype.feedDataAsync = function () {
        var mockData = {
            firstName: "Toine",
            lastName: "koene",
            gender: Gender.Male,
            carBrand: CarBrand.BMW,
        };
        return Promise.resolve(null);
    };
    Example.prototype.onSubmit = function (fields) {
        return __awaiter(this, void 0, void 0, function () {
            var newData;
            return __generator(this, function (_a) {
                newData = {};
                Object.keys(fields).forEach(function (key) {
                    return (newData[key] = fields[key].value);
                });
                return [2 /*return*/, Promise.resolve({
                        success: true,
                        successMessage: "Form saved successfully",
                    })];
            });
        });
    };
    __decorate([
        textField({
            type: "Text",
            label: "First name:",
            validations: [
                {
                    condition: function (input) { return input.length > 3; },
                    errorMessage: "length needs to be higher than 3",
                },
            ],
        }),
        __metadata("design:type", String)
    ], Example.prototype, "firstName", void 0);
    __decorate([
        textField({
            type: "Text",
            label: "Last name:",
            validations: [
                {
                    condition: function (input) { return input.length > 2; },
                    errorMessage: "length needs to be higher than 2 ",
                },
            ],
        }),
        __metadata("design:type", String)
    ], Example.prototype, "lastName", void 0);
    __decorate([
        radioField({
            type: "Radio",
            label: "Gender:",
            options: [
                {
                    label: "Male",
                    value: Gender.Male,
                },
                {
                    label: "Female",
                    value: Gender.Female,
                },
            ],
        }),
        __metadata("design:type", Number)
    ], Example.prototype, "gender", void 0);
    __decorate([
        selectField({
            label: "Car brand:",
            type: "Select",
            options: [
                {
                    label: "Mercedes",
                    value: CarBrand.Mercedes,
                },
                {
                    label: "BMW",
                    value: CarBrand.BMW,
                },
                {
                    label: "Volvo",
                    value: CarBrand.Volvo,
                },
            ],
        }),
        __metadata("design:type", Number)
    ], Example.prototype, "carBrand", void 0);
    return Example;
}(FormBuilder));
export { Example };
