"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneHotEncoder = exports.StandardScaler = void 0;
const numerical_js_1 = __importDefault(require("./numerical.js"));
exports.StandardScaler = numerical_js_1.default;
const categorical_js_1 = __importDefault(require("./categorical.js"));
exports.OneHotEncoder = categorical_js_1.default;
