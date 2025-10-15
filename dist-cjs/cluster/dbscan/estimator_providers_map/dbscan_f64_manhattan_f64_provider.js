"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../linalg/dense-matrix/index.js");
const index_js_2 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANF64ManhattanF64Provider {
    parameters(config) {
        const parameters = new index_js_2.DBSCANF64EuclidianF64Parameters().withDistanceManhattanF64(new index_js_2.ManhattanF64());
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = index_js_1.converters.toDenseMatrixF64(x);
        return index_js_2.DBSCANF64I32ManhattanF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return index_js_1.converters.toDenseMatrixF64(x);
    }
    deserialize(data) {
        return index_js_2.DBSCANF64I32ManhattanF64.deserialize(data);
    }
}
exports.default = DBSCANF64ManhattanF64Provider;
