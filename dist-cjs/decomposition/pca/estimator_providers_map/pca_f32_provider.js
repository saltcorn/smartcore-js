"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const index_js_2 = require("./index.js");
class PCAF32Provider {
    parameters(config) {
        const parameters = new index_js_1.PCAParameters();
        (0, index_js_2.setPCAParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = x.asRsMatrix('f32');
        return index_js_1.PCAF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return index_js_1.PCAF32.deserialize(data);
    }
}
exports.default = PCAF32Provider;
