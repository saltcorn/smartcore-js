import { KMeansF64BigI64, KMeansF64I64, KMeansParameters, KMeansF64F64 } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
var EstimatorType;
(function (EstimatorType) {
    EstimatorType[EstimatorType["F64I64"] = 0] = "F64I64";
    EstimatorType[EstimatorType["F64BigI64"] = 1] = "F64BigI64";
    EstimatorType[EstimatorType["F64F64"] = 2] = "F64F64";
})(EstimatorType || (EstimatorType = {}));
class KMeans {
    constructor(params) {
        this.estimator = null;
        this.parameters = new KMeansParameters();
        if (params) {
            if (params.maxIter !== undefined) {
                this.parameters.withMaxIter(params.maxIter);
            }
            if (params.k !== undefined) {
                this.parameters.withK(params.k);
            }
        }
    }
    fit(x, y) {
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof Float64Array) {
            this.estimator = KMeansF64F64.fit(matrix.asF64(), this.parameters);
        }
        else if (y instanceof BigInt64Array) {
            this.estimator = KMeansF64BigI64.fit(matrix.asF64(), this.parameters);
        }
        else if (y.every((val) => Number.isInteger(val))) {
            this.estimator = KMeansF64I64.fit(matrix.asF64(), this.parameters);
        }
        else {
            throw new Error('Unsupported data type for input arrays.');
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
        let estimator;
        if (estimatorType === EstimatorType.F64BigI64) {
            estimator = KMeansF64BigI64.deserialize(data);
        }
        else if (estimatorType === EstimatorType.F64I64) {
            estimator = KMeansF64I64.deserialize(data);
        }
        else if (estimatorType === EstimatorType.F64F64) {
            estimator = KMeansF64F64.deserialize(data);
        }
        else {
            throw new Error('Unsupported estimator type');
        }
        let instance = new KMeans();
        instance.estimator = estimator;
        return instance;
    }
}
export { KMeans };
