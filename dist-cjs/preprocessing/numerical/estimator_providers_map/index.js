"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformerProvidersMap = void 0;
const standard_scaler_f32_provider_js_1 = __importDefault(require("./standard_scaler_f32_provider.js"));
const standard_scaler_f64_provider_js_1 = __importDefault(require("./standard_scaler_f64_provider.js"));
const TransformerProvidersMap = new Map();
exports.TransformerProvidersMap = TransformerProvidersMap;
TransformerProvidersMap.set('f32', new standard_scaler_f32_provider_js_1.default());
TransformerProvidersMap.set('f64', new standard_scaler_f64_provider_js_1.default());
