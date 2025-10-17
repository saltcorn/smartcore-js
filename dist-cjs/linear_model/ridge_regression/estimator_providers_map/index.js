"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstimatorProvidersMap = void 0;
exports.setRidgeRegressionParametersValues = setRidgeRegressionParametersValues;
const ridge_regression_f32_f32_provider_js_1 = __importDefault(require("./ridge_regression_f32_f32_provider.js"));
const ridge_regression_f32_f64_provider_js_1 = __importDefault(require("./ridge_regression_f32_f64_provider.js"));
const ridge_regression_f64_f32_provider_js_1 = __importDefault(require("./ridge_regression_f64_f32_provider.js"));
const ridge_regression_f64_f64_provider_js_1 = __importDefault(require("./ridge_regression_f64_f64_provider.js"));
const F32EstimatorProvidersMap = new Map();
F32EstimatorProvidersMap.set('f32', new ridge_regression_f32_f32_provider_js_1.default());
F32EstimatorProvidersMap.set('f64', new ridge_regression_f32_f64_provider_js_1.default());
const F64EstimatorProvidersMap = new Map();
F32EstimatorProvidersMap.set('f32', new ridge_regression_f64_f32_provider_js_1.default());
F32EstimatorProvidersMap.set('f64', new ridge_regression_f64_f64_provider_js_1.default());
const EstimatorProvidersMap = new Map();
exports.EstimatorProvidersMap = EstimatorProvidersMap;
EstimatorProvidersMap.set('f32', F32EstimatorProvidersMap);
EstimatorProvidersMap.set('f64', F64EstimatorProvidersMap);
function setRidgeRegressionParametersValues(parameters, config) {
    if (config.solver) {
        parameters.withSolver(config.solver);
    }
    if (config.alpha) {
        parameters.withAlpha(config.alpha);
    }
    if (config.normalize) {
        parameters.withNormalize(config.normalize);
    }
}
