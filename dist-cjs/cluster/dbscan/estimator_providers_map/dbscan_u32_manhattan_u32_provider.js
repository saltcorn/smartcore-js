"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../linalg/dense-matrix/index.js");
const index_js_2 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANU32ManhattanU32Provider {
    parameters(config) {
        const parameters = new index_js_2.DBSCANU32EuclidianU32Parameters().withDistanceManhattanU32(new index_js_2.ManhattanU32());
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU32 = index_js_1.converters.toDenseMatrixU32(x);
        return index_js_2.DBSCANU32I32ManhattanU32.fit(xAsU32, parameters);
    }
    toMatrix(x) {
        return index_js_1.converters.toDenseMatrixU32(x);
    }
    deserialize(data) {
        return index_js_2.DBSCANU32I32ManhattanU32.deserialize(data);
    }
}
exports.default = DBSCANU32ManhattanU32Provider;
