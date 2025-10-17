"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const index_js_2 = require("./index.js");
class SVDF64Provider {
    parameters(config) {
        const parameters = new index_js_1.SVDParameters();
        (0, index_js_2.setSVDParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = x.asRsMatrix('f64');
        return index_js_1.SVDF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f64');
    }
    deserialize(data) {
        return index_js_1.SVDF64.deserialize(data);
    }
}
exports.default = SVDF64Provider;
