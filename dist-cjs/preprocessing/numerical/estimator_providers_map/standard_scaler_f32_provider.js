"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
class StandardScalerF32Provider {
    parameters(_config) {
        const parameters = new index_js_1.StandardScalerParameters();
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = x.asRsMatrix('f32');
        return index_js_1.StandardScalerF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return index_js_1.StandardScalerF32.deserialize(data);
    }
}
exports.default = StandardScalerF32Provider;
