"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNNClassifierMinkowski = void 0;
const index_js_1 = require("../../../core-bindings/index.js");
const index_js_2 = require("../../linalg/index.js");
const index_js_3 = require("./index.js");
class KNNClassifierStatics {
    parameters;
    constructor(parameters) {
        if (parameters?.p === undefined) {
            throw new Error("Minkowski requires 'p' to be defined");
        }
        this.parameters = new index_js_1.KNNClassifierF64EuclidianF64Parameters().withDistanceMinkowskiF64(new index_js_1.MinkowskiF64(parameters.p));
    }
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
class KNNClassifierMinkowski extends KNNClassifierStatics {
    estimator = null;
    constructor(params) {
        super(params);
        this.initializeParameterValues(params);
    }
    fit(x, y) {
        let matrix = x instanceof index_js_2.DenseMatrix ? x : index_js_2.DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof BigInt64Array) {
            this.estimator = index_js_1.KNNClassifierF64BigI64MinkowskiF64.fit(matrix.asF64(), y, this.params);
        }
        else if (y instanceof BigUint64Array) {
            this.estimator = index_js_1.KNNClassifierF64BigU64MinkowskiF64.fit(matrix.asF64(), y, this.params);
        }
        else if (!(y instanceof Float64Array)) {
            this.estimator = index_js_1.KNNClassifierF64I64MinkowskiF64.fit(matrix.asF64(), y, this.params);
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
        let instance = new KNNClassifierMinkowski({ p: 0 });
        switch (estimatorType) {
            case index_js_3.EstimatorType.F64BigI64:
                instance.estimator = index_js_1.KNNClassifierF64BigI64MinkowskiF64.deserialize(data);
                break;
            case index_js_3.EstimatorType.F64BigU64:
                instance.estimator = index_js_1.KNNClassifierF64BigU64MinkowskiF64.deserialize(data);
                break;
            case index_js_3.EstimatorType.F64I64:
                instance.estimator = index_js_1.KNNClassifierF64I64MinkowskiF64.deserialize(data);
                break;
            default:
                throw new Error(`Unrecognized estimator type: '${estimatorType}'`);
        }
        return instance;
    }
}
exports.KNNClassifierMinkowski = KNNClassifierMinkowski;
