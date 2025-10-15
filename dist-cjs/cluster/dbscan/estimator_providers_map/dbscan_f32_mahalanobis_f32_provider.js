"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../linalg/dense-matrix/index.js");
const index_js_2 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANF32MahalanobisF32Provider {
    parameters(config) {
        if (!config.data) {
            throw new Error(`MahalanobisF32 expects 'config.data' to be provided.`);
        }
        const dataAsF32 = index_js_1.converters.toDenseMatrixF32(config.data);
        const parameters = new index_js_2.DBSCANF32EuclidianF32Parameters().withDistanceMahalanobisF32(new index_js_2.MahalanobisF32(dataAsF32));
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = index_js_1.converters.toDenseMatrixF32(x);
        return index_js_2.DBSCANF32I32MahalanobisF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return index_js_1.converters.toDenseMatrixF32(x);
    }
    deserialize(data) {
        return index_js_2.DBSCANF32I32MahalanobisF32.deserialize(data);
    }
}
exports.default = DBSCANF32MahalanobisF32Provider;
