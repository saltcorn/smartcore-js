"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultinomialNB = exports.GaussianNB = exports.CategoricalNB = exports.BernoulliNB = void 0;
const bernoulli_js_1 = __importDefault(require("./bernoulli.js"));
exports.BernoulliNB = bernoulli_js_1.default;
const categorical_js_1 = __importDefault(require("./categorical.js"));
exports.CategoricalNB = categorical_js_1.default;
const gaussian_js_1 = __importDefault(require("./gaussian.js"));
exports.GaussianNB = gaussian_js_1.default;
const multinomial_js_1 = __importDefault(require("./multinomial.js"));
exports.MultinomialNB = multinomial_js_1.default;
