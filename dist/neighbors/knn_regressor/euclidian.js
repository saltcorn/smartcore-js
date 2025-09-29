"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNNRegressorEuclidian = void 0;
const index_js_1 = require("../../../core-bindings/index.js");
const index_js_2 = require("../../linalg/index.js");
const index_js_3 = require("./index.js");
class KNNRegressorStatics {
    parameters = new index_js_1.KNNRegressorF64EuclidianF64Parameters();
    constructor() { }
    get params() {
        return this.parameters;
    }
    initializeParameterValues(parameters) {
        if (parameters?.k) {
            this.parameters.withK(parameters.k);
        }
        if (parameters?.algorithm) {
            this.parameters.withAlgorithm(parameters.algorithm);
        }
        if (parameters?.weight) {
            this.parameters.withWeight(parameters.weight);
        }
    }
}
class KNNRegressorEuclidian extends KNNRegressorStatics {
    estimator = null;
    constructor(params) {
        super();
        this.initializeParameterValues(params);
    }
    fit(x, y) {
        let matrix = x instanceof index_js_2.DenseMatrix ? x : index_js_2.DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof BigInt64Array) {
            this.estimator = index_js_1.KNNRegressorF64BigI64EuclidianF64.fit(matrix.asF64(), y, this.params);
        }
        else if (y instanceof BigUint64Array) {
            this.estimator = index_js_1.KNNRegressorF64BigU64EuclidianF64.fit(matrix.asF64(), y, this.params);
        }
        else if (y instanceof Float64Array) {
            this.estimator = index_js_1.KNNRegressorF64F64EuclidianF64.fit(matrix.asF64(), y, this.params);
        }
        else if (y instanceof Array) {
            this.estimator = index_js_1.KNNRegressorF64I64EuclidianF64.fit(matrix.asF64(), y, this.params);
        }
        else {
            throw new Error('Unsupported data type');
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
    static deserialize(data, estimatorType) {
        let instance = new KNNRegressorEuclidian();
        switch (estimatorType) {
            case index_js_3.EstimatorType.F64F64:
                instance.estimator = index_js_1.KNNRegressorF64F64EuclidianF64.deserialize(data);
                break;
            case index_js_3.EstimatorType.F64BigI64:
                instance.estimator = index_js_1.KNNRegressorF64BigI64EuclidianF64.deserialize(data);
                break;
            case index_js_3.EstimatorType.F64BigU64:
                instance.estimator = index_js_1.KNNRegressorF64BigU64EuclidianF64.deserialize(data);
                break;
            case index_js_3.EstimatorType.F64I64:
                instance.estimator = index_js_1.KNNRegressorF64I64EuclidianF64.deserialize(data);
                break;
            default:
                throw new Error(`Unrecognized estimator type: '${estimatorType}'`);
        }
        return instance;
    }
}
exports.KNNRegressorEuclidian = KNNRegressorEuclidian;
