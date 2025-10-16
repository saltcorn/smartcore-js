"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANU64ManhattanU64Provider {
    parameters(config) {
        const parameters = new index_js_1.DBSCANU64EuclidianU64Parameters().withDistanceManhattanU64(new index_js_1.ManhattanU64());
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsU64 = x.asRsMatrix('u64');
        return index_js_1.DBSCANU64I32ManhattanU64.fit(xAsU64, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('u64');
    }
    deserialize(data) {
        return index_js_1.DBSCANU64I32ManhattanU64.deserialize(data);
    }
}
exports.default = DBSCANU64ManhattanU64Provider;
