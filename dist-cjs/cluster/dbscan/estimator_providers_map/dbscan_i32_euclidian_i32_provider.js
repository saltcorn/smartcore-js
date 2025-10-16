"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANI32EuclidianI32Provider {
    parameters(config) {
        const parameters = new index_js_1.DBSCANI32EuclidianI32Parameters();
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsI32 = x.asRsMatrix('i32');
        return index_js_1.DBSCANI32I32EuclidianI32.fit(xAsI32, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('i32');
    }
    deserialize(data) {
        return index_js_1.DBSCANI32I32EuclidianI32.deserialize(data);
    }
}
exports.default = DBSCANI32EuclidianI32Provider;
