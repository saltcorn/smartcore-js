"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class KMeansI32I32Provider {
    parameters(config) {
        const parameters = new index_js_1.KMeansParameters();
        (0, parameters_js_1.setKMeansParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI32 = x.asRsMatrix('i32');
        return index_js_1.KMeansI32I64.fit(xAsI32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('i32');
    }
    deserialize(data) {
        return index_js_1.KMeansI32I64.deserialize(data);
    }
}
exports.default = KMeansI32I32Provider;
