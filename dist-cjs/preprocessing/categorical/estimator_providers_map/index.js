"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformerProvidersMap = void 0;
exports.normalizeCategoricalParams = normalizeCategoricalParams;
const one_hot_encoder_f32_provider_js_1 = __importDefault(require("./one_hot_encoder_f32_provider.js"));
const one_hot_encoder_f64_provider_js_1 = __importDefault(require("./one_hot_encoder_f64_provider.js"));
const TransformerProvidersMap = new Map();
exports.TransformerProvidersMap = TransformerProvidersMap;
TransformerProvidersMap.set('f32', new one_hot_encoder_f32_provider_js_1.default());
TransformerProvidersMap.set('f64', new one_hot_encoder_f64_provider_js_1.default());
function normalizeCategoricalParams(categoricalParams) {
    if (categoricalParams instanceof BigUint64Array) {
        return categoricalParams;
    }
    else if (categoricalParams instanceof Uint32Array) {
        return BigUint64Array.from(categoricalParams);
    }
    else if (Array.isArray(categoricalParams)) {
        let params = categoricalParams.map((v) => {
            if (!Number.isInteger(v) || v < 0) {
                throw new Error(`Expected 'categoricalParams' to be an array of unsigned integers.`);
            }
            return BigInt(v);
        });
        return new BigUint64Array(params);
    }
    else {
        throw new Error(`Expected 'categoricalParams' to be an array of numeric values`);
    }
}
