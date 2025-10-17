"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class DBSCANI32HammingI32Provider {
    parameters(config) {
        const parameters = new index_js_1.DBSCANI32EuclidianI32Parameters().withDistanceHammingI32(new index_js_1.HammingI32());
        (0, parameters_js_1.setDBSCANParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI32 = x.asRsMatrix('i32');
        return index_js_1.DBSCANI32I32HammingI32.fit(xAsI32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('i32');
    }
    deserialize(data) {
        return index_js_1.DBSCANI32I32HammingI32.deserialize(data);
    }
}
exports.default = DBSCANI32HammingI32Provider;
