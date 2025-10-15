"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../linalg/dense-matrix/index.js");
const index_js_2 = require("../../../core-bindings/index.js");
class StandardScalerF32Provider {
    parameters(_config) {
        const parameters = new index_js_2.StandardScalerParameters();
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = index_js_1.converters.toDenseMatrixF32(x);
        return index_js_2.StandardScalerF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return index_js_1.converters.toDenseMatrixF32(x);
    }
    deserialize(data) {
        return index_js_2.StandardScalerF32.deserialize(data);
    }
}
exports.default = StandardScalerF32Provider;
