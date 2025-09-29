"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SVD = void 0;
const index_js_1 = require("../../core-bindings/index.js");
const index_js_2 = require("../linalg/index.js");
class SVD {
    parameters;
    estimator = null;
    constructor(params) {
        this.parameters = new index_js_1.SVDParameters();
        if (params) {
            if (params.nComponents !== undefined) {
                this.parameters.withNComponents(params.nComponents);
            }
        }
    }
    fit(x, y) {
        let matrix = x instanceof index_js_2.DenseMatrix ? x : index_js_2.DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof Float64Array) {
            this.estimator = index_js_1.SVDF64.fit(matrix.asF64(), this.parameters);
        }
        else {
            throw new Error('Unsupported data type for input arrays.');
        }
        return this;
    }
    transform(x) {
        if (this.estimator === null) {
            throw new Error("The 'fit' method should called before the 'predict' method is called.");
        }
        let matrix = x instanceof index_js_2.DenseMatrix ? x : index_js_2.DenseMatrix.f64(x);
        return new index_js_2.DenseMatrix(this.estimator.transform(matrix.asF64()));
    }
    serialize() {
        return this.estimator?.serialize();
    }
    static deserialize(data) {
        let estimator = index_js_1.SVDF64.deserialize(data);
        let instance = new SVD();
        instance.estimator = estimator;
        return instance;
    }
}
exports.SVD = SVD;
