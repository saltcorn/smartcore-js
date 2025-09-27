import { KNNClassifierF64EuclidianF64Parameters, KNNClassifierF64I64MahalanobisF64, KNNClassifierF64BigI64MahalanobisF64, KNNClassifierF64BigU64MahalanobisF64, KNNClassifierF64MahalanobisF64Parameters, MahalanobisF64, } from '../../../core-bindings/index.js';
import { DenseMatrix } from '../../linalg/index.js';
import {} from './index.js';
var EstimatorType;
(function (EstimatorType) {
    EstimatorType[EstimatorType["F64I64"] = 0] = "F64I64";
    EstimatorType[EstimatorType["F64BigI64"] = 1] = "F64BigI64";
    EstimatorType[EstimatorType["F64BigU64"] = 2] = "F64BigU64";
})(EstimatorType || (EstimatorType = {}));
class KNNClassifierStatics {
    constructor(parameters) {
        if (parameters?.data === undefined) {
            throw new Error("Mahalanobis requires 'data' to be defined");
        }
        let matrix = parameters.data instanceof DenseMatrix ? parameters.data : DenseMatrix.f64(parameters.data);
        this.parameters = new KNNClassifierF64EuclidianF64Parameters().withDistanceMahalanobisF64(new MahalanobisF64(matrix.asF64()));
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
class KNNClassifierMahalanobis extends KNNClassifierStatics {
    constructor(params) {
        super();
        this.estimator = null;
        this.initializeParameterValues(params);
    }
    fit(x, y) {
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof BigInt64Array) {
            this.estimator = KNNClassifierF64BigI64MahalanobisF64.fit(matrix.asF64(), y, this.params);
        }
        else if (y instanceof BigUint64Array) {
            this.estimator = KNNClassifierF64BigU64MahalanobisF64.fit(matrix.asF64(), y, this.params);
        }
        else if (!(y instanceof Float64Array)) {
            this.estimator = KNNClassifierF64I64MahalanobisF64.fit(matrix.asF64(), y, this.params);
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
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        return this.estimator.predict(matrix.asF64());
    }
    serialize() {
        return this.estimator?.serialize();
    }
    static deserialize(data, estimatorType) {
        let instance = new KNNClassifierMahalanobis();
        switch (estimatorType) {
            case EstimatorType.F64BigI64:
                instance.estimator = KNNClassifierF64BigI64MahalanobisF64.deserialize(data);
                break;
            case EstimatorType.F64BigU64:
                instance.estimator = KNNClassifierF64BigU64MahalanobisF64.deserialize(data);
                break;
            case EstimatorType.F64I64:
                instance.estimator = KNNClassifierF64I64MahalanobisF64.deserialize(data);
                break;
            default:
                throw new Error(`Unrecognized estimator type: '${estimatorType}'`);
        }
        return instance;
    }
}
export { KNNClassifierMahalanobis };
