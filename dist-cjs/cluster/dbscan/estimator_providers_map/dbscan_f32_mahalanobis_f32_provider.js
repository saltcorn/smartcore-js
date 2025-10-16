"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANF32MahalanobisF32Provider {
    parameters(config) {
        if (!config.data) {
            throw new Error(`MahalanobisF32 expects 'config.data' to be provided.`);
        }
        const dataAsF32 = config.data.asRsMatrix('f32');
        const parameters = new index_js_1.DBSCANF32EuclidianF32Parameters().withDistanceMahalanobisF32(new index_js_1.MahalanobisF32(dataAsF32));
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsF32 = x.asRsMatrix('f32');
        return index_js_1.DBSCANF32I32MahalanobisF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return index_js_1.DBSCANF32I32MahalanobisF32.deserialize(data);
    }
}
exports.default = DBSCANF32MahalanobisF32Provider;
