"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../core-bindings/index.js");
const index_js_2 = require("../linalg/index.js");
class OneHotEncoder {
    parameters;
    estimator = null;
    constructor(params) {
        this.parameters = new index_js_1.OneHotEncoderParameters(params.categoricalParams);
    }
    fit(x, _y) {
        x = x instanceof index_js_2.DenseMatrix ? x : index_js_2.DenseMatrix.f64(x);
        this.estimator = new index_js_1.OneHotEncoderF64(x.asF64(), this.parameters);
        return this;
    }
    transform(x) {
        if (this.estimator === null) {
            throw new Error("The 'fit' method should called before the 'transform' method is called.");
        }
        x = x instanceof index_js_2.DenseMatrix ? x : index_js_2.DenseMatrix.f64(x);
        return new index_js_2.DenseMatrix(this.estimator.transform(x.asF64()));
    }
}
exports.default = OneHotEncoder;
