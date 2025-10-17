"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const index_js_2 = require("./index.js");
class SVDF32Provider {
    parameters(config) {
        const parameters = new index_js_1.SVDParameters();
        (0, index_js_2.setSVDParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = x.asRsMatrix('f32');
        return index_js_1.SVDF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return index_js_1.SVDF32.deserialize(data);
    }
}
exports.default = SVDF32Provider;
