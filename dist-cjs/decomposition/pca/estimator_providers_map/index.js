"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformerProvidersMap = void 0;
exports.setPCAParametersValues = setPCAParametersValues;
const pca_f32_provider_js_1 = __importDefault(require("./pca_f32_provider.js"));
const pca_f64_provider_js_1 = __importDefault(require("./pca_f64_provider.js"));
const TransformerProvidersMap = new Map();
exports.TransformerProvidersMap = TransformerProvidersMap;
TransformerProvidersMap.set('f32', new pca_f32_provider_js_1.default());
TransformerProvidersMap.set('f64', new pca_f64_provider_js_1.default());
function setPCAParametersValues(parameters, config) {
    if (config.nComponents !== undefined) {
        parameters.withNComponents(config.nComponents);
    }
    if (config.correlationMatrix !== undefined) {
        parameters.useCorrelationMatrix(config.correlationMatrix);
    }
}
