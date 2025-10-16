"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class KMeansF32F32Provider {
    parameters(config) {
        const parameters = new index_js_1.KMeansParameters();
        (0, parameters_js_1.setKMeansParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = x.asRsMatrix('f32');
        return index_js_1.KMeansF32I64.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return index_js_1.KMeansF32I64.deserialize(data);
    }
}
exports.default = KMeansF32F32Provider;
