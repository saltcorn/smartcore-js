"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
const index_js_2 = require("./index.js");
const index_js_3 = require("../../../utilities/index.js");
class RidgeRegressionF64F32Provider {
    parameters(config) {
        const parameters = new index_js_1.RidgeRegressionF32Parameters();
        (0, index_js_2.setRidgeRegressionParametersValues)(parameters, config);
        return parameters;
    }
    estimator(x, y, parameters) {
        const xAsF64 = x.asRsMatrix('f64');
        const yAsF32 = (0, index_js_3.yAsFloat32Array)(y);
        return index_js_1.RidgeRegressionF64F32.fit(xAsF64, yAsF32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return index_js_1.RidgeRegressionF64F32.deserialize(data);
    }
}
exports.default = RidgeRegressionF64F32Provider;
