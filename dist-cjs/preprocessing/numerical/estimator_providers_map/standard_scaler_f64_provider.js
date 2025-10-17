"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
class StandardScalerF64Provider {
    parameters(_config) {
        const parameters = new index_js_1.StandardScalerParameters();
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = x.asRsMatrix('f64');
        return index_js_1.StandardScalerF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f64');
    }
    deserialize(data) {
        return index_js_1.StandardScalerF64.deserialize(data);
    }
}
exports.default = StandardScalerF64Provider;
