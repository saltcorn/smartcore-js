"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../core-bindings/index.js");
const index_js_2 = require("../linalg/index.js");
class CategoricalNB {
    parameters;
    estimator = null;
    constructor(params) {
        this.parameters = new index_js_1.CategoricalNBParameters();
        if (params?.alpha) {
            this.parameters.withAlpha(params.alpha);
        }
    }
    fit(x, y) {
        let matrix = x instanceof index_js_2.DenseMatrix ? x : index_js_2.DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof BigUint64Array) {
            this.estimator = index_js_1.CategoricalNBBigU64.fit(matrix.asF64(), y, this.parameters);
        }
        else {
            throw new Error('Unsupported data type!');
        }
        return this;
    }
    predict(x) {
        if (this.estimator === null) {
            throw new Error("The 'fit' method should called before the 'predict' method is called.");
        }
        let matrix = x instanceof index_js_2.DenseMatrix ? x : index_js_2.DenseMatrix.f64(x);
        return this.estimator.predict(matrix.asF64());
    }
    serialize() {
        return this.estimator?.serialize();
    }
    static deserialize(data) {
        let instance = new CategoricalNB();
        instance.estimator = index_js_1.CategoricalNBBigU64.deserialize(data);
        return instance;
    }
}
exports.default = CategoricalNB;
