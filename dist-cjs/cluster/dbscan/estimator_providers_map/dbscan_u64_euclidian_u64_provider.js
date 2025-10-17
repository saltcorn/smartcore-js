"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANU64EuclidianU64Provider {
    parameters(config) {
        const parameters = new index_js_1.DBSCANU64EuclidianU64Parameters();
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU64 = x.asRsMatrix('u64');
        return index_js_1.DBSCANU64I32EuclidianU64.fit(xAsU64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('u64');
    }
    deserialize(data) {
        return index_js_1.DBSCANU64I32EuclidianU64.deserialize(data);
    }
}
exports.default = DBSCANU64EuclidianU64Provider;
