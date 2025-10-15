"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../linalg/dense-matrix/index.js");
const index_js_2 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class KMeansU64U64Provider {
    parameters(config) {
        const parameters = new index_js_2.KMeansParameters();
        (0, parameters_js_1.setKMeansParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU64 = index_js_1.converters.toDenseMatrixU64(x);
        return index_js_2.KMeansU64I64.fit(xAsU64, parameters);
    }
    toMatrix(x) {
        return index_js_1.converters.toDenseMatrixU64(x);
    }
    deserialize(data) {
        return index_js_2.KMeansU64I64.deserialize(data);
    }
}
exports.default = KMeansU64U64Provider;
