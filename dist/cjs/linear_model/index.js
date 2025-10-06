"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticNet = exports.Lasso = exports.RidgeRegression = exports.LogisticRegression = exports.LinearRegression = void 0;
const linear_regression_js_1 = __importDefault(require("./linear_regression.js"));
exports.LinearRegression = linear_regression_js_1.default;
const logistic_regression_js_1 = __importDefault(require("./logistic_regression.js"));
exports.LogisticRegression = logistic_regression_js_1.default;
const ridge_regression_js_1 = __importDefault(require("./ridge_regression.js"));
exports.RidgeRegression = ridge_regression_js_1.default;
const lasso_js_1 = __importDefault(require("./lasso.js"));
exports.Lasso = lasso_js_1.default;
const elastic_net_js_1 = __importDefault(require("./elastic_net.js"));
exports.ElasticNet = elastic_net_js_1.default;
