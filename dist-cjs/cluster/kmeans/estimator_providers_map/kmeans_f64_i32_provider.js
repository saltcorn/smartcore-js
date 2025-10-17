"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const parameters_js_1 = require("../parameters.js");
class KMeansF64F64Provider {
    parameters(config) {
        const parameters = new index_js_1.KMeansParameters();
        (0, parameters_js_1.setKMeansParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = x.asRsMatrix('f64');
        return index_js_1.KMeansF64I32.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f64');
    }
    deserialize(data) {
        return index_js_1.KMeansF64I32.deserialize(data);
    }
}
exports.default = KMeansF64F64Provider;
