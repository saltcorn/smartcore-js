"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANU8EuclidianU8Provider {
    parameters(config) {
        const parameters = new index_js_1.DBSCANU8EuclidianU8Parameters();
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsU8 = x.asRsMatrix('u8');
        return index_js_1.DBSCANU8I32EuclidianU8.fit(xAsU8, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('u8');
    }
    deserialize(data) {
        return index_js_1.DBSCANU8I32EuclidianU8.deserialize(data);
    }
}
exports.default = DBSCANU8EuclidianU8Provider;
