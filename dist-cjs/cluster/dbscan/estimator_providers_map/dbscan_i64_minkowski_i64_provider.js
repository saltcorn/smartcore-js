"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANI64MinkowskiI64Provider {
    parameters(config) {
        if (!config.p) {
            throw new Error(`Minkowski expects 'config.p' to be provided.`);
        }
        const parameters = new index_js_1.DBSCANI64EuclidianI64Parameters().withDistanceMinkowskiI64(new index_js_1.MinkowskiI64(config.p));
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI64 = x.asRsMatrix('i64');
        return index_js_1.DBSCANI64I32MinkowskiI64.fit(xAsI64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('i64');
    }
    deserialize(data) {
        return index_js_1.DBSCANI64I32MinkowskiI64.deserialize(data);
    }
}
exports.default = DBSCANI64MinkowskiI64Provider;
