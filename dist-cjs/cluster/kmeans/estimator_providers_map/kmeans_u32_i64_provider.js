"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class KMeansU32U32Provider {
    parameters(config) {
        const parameters = new index_js_1.KMeansParameters();
        (0, parameters_js_1.setKMeansParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU32 = x.asRsMatrix('u32');
        return index_js_1.KMeansU32I64.fit(xAsU32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('u32');
    }
    deserialize(data) {
        return index_js_1.KMeansU32I64.deserialize(data);
    }
}
exports.default = KMeansU32U32Provider;
