"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANF64MinkowskiF64Provider {
    parameters(config) {
        if (!config.p) {
            throw new Error(`Minkowski expects 'config.p' to be provided.`);
        }
        const parameters = new index_js_1.DBSCANF64EuclidianF64Parameters().withDistanceMinkowskiF64(new index_js_1.MinkowskiF64(config.p));
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsF64 = x.asRsMatrix('f64');
        return index_js_1.DBSCANF64I32MinkowskiF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('f64');
    }
    deserialize(data) {
        return index_js_1.DBSCANF64I32MinkowskiF64.deserialize(data);
    }
}
exports.default = DBSCANF64MinkowskiF64Provider;
