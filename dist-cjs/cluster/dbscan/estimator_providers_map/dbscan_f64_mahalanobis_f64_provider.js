"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../linalg/dense-matrix/index.js");
const index_js_2 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANF64MahalanobisF64Provider {
    parameters(config) {
        if (!config.data) {
            throw new Error(`MahalanobisF64 expects 'config.data' to be provided.`);
        }
        const dataAsF64 = index_js_1.converters.toDenseMatrixF64(config.data);
        const parameters = new index_js_2.DBSCANF64EuclidianF64Parameters().withDistanceMahalanobisF64(new index_js_2.MahalanobisF64(dataAsF64));
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = index_js_1.converters.toDenseMatrixF64(x);
        return index_js_2.DBSCANF64I32MahalanobisF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return index_js_1.converters.toDenseMatrixF64(x);
    }
    deserialize(data) {
        return index_js_2.DBSCANF64I32MahalanobisF64.deserialize(data);
    }
}
exports.default = DBSCANF64MahalanobisF64Provider;
