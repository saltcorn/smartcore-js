"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../linalg/dense-matrix/index.js");
const index_js_2 = require("../../../core-bindings/index.js");
class StandardScalerF64Provider {
    parameters(_config) {
        const parameters = new index_js_2.StandardScalerParameters();
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = index_js_1.converters.toDenseMatrixF64(x);
        return index_js_2.StandardScalerF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return index_js_1.converters.toDenseMatrixF64(x);
    }
    deserialize(data) {
        return index_js_2.StandardScalerF64.deserialize(data);
    }
}
exports.default = StandardScalerF64Provider;
