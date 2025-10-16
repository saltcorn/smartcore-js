"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANF32EuclidianF32Provider {
    parameters(config) {
        const parameters = new index_js_1.DBSCANF32EuclidianF32Parameters();
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsF32 = x.asRsMatrix('f32');
        return index_js_1.DBSCANF32I32EuclidianF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return index_js_1.DBSCANF32I32EuclidianF32.deserialize(data);
    }
}
exports.default = DBSCANF32EuclidianF32Provider;
