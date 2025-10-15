"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../linalg/dense-matrix/index.js");
const index_js_2 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANU8EuclidianU8Provider {
    parameters(config) {
        const parameters = new index_js_2.DBSCANU8EuclidianU8Parameters();
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU8 = index_js_1.converters.toDenseMatrixU8(x);
        return index_js_2.DBSCANU8I32EuclidianU8.fit(xAsU8, parameters);
    }
    toMatrix(x) {
        return index_js_1.converters.toDenseMatrixU8(x);
    }
    deserialize(data) {
        return index_js_2.DBSCANU8I32EuclidianU8.deserialize(data);
    }
}
exports.default = DBSCANU8EuclidianU8Provider;
