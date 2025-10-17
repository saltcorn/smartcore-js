"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const index_js_2 = require("./index.js");
class OneHotEncoderF64Provider {
    parameters(config) {
        let categoricalParams = (0, index_js_2.normalizeCategoricalParams)(config.categoricalParams);
        const parameters = new index_js_1.OneHotEncoderParameters(categoricalParams);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = x.asRsMatrix('f64');
        return index_js_1.OneHotEncoderF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f64');
    }
    deserialize(data) {
        return index_js_1.OneHotEncoderF64.deserialize(data);
    }
}
exports.default = OneHotEncoderF64Provider;
