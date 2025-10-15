"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../linalg/dense-matrix/index.js");
const index_js_2 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANU16EuclidianU16Provider {
    parameters(config) {
        const parameters = new index_js_2.DBSCANU16EuclidianU16Parameters();
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU16 = index_js_1.converters.toDenseMatrixU16(x);
        return index_js_2.DBSCANU16I32EuclidianU16.fit(xAsU16, parameters);
    }
    toMatrix(x) {
        return index_js_1.converters.toDenseMatrixU16(x);
    }
    deserialize(data) {
        return index_js_2.DBSCANU16I32EuclidianU16.deserialize(data);
    }
}
exports.default = DBSCANU16EuclidianU16Provider;
