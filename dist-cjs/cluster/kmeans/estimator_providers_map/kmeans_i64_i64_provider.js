"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class KMeansI64I64Provider {
    parameters(config) {
        const parameters = new index_js_1.KMeansParameters();
        (0, parameters_js_1.setKMeansParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI64 = x.asRsMatrix('i64');
        return index_js_1.KMeansI64I64.fit(xAsI64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('i64');
    }
    deserialize(data) {
        return index_js_1.KMeansI64I64.deserialize(data);
    }
}
exports.default = KMeansI64I64Provider;
