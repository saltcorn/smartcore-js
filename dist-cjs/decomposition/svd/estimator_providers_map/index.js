"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformerProvidersMap = void 0;
exports.setSVDParametersValues = setSVDParametersValues;
const svd_f32_provider_js_1 = __importDefault(require("./svd_f32_provider.js"));
const svd_f64_provider_js_1 = __importDefault(require("./svd_f64_provider.js"));
const TransformerProvidersMap = new Map();
exports.TransformerProvidersMap = TransformerProvidersMap;
TransformerProvidersMap.set('f32', new svd_f32_provider_js_1.default());
TransformerProvidersMap.set('f64', new svd_f64_provider_js_1.default());
function setSVDParametersValues(parameters, config) {
    if (config.nComponents !== undefined) {
        parameters.withNComponents(config.nComponents);
    }
}
