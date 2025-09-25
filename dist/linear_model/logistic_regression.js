import { LogisticRegressionF64I64, LogisticRegressionParametersF64, LogisticRegressionF64BigI64, } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
var EstimatorType;
(function (EstimatorType) {
    EstimatorType[EstimatorType["F64BigI64"] = 0] = "F64BigI64";
    EstimatorType[EstimatorType["F64I64"] = 1] = "F64I64";
})(EstimatorType || (EstimatorType = {}));
class LogisticRegression {
    constructor(params) {
        this.estimator = null;
        let parameters = new LogisticRegressionParametersF64();
        if (params) {
            if (params.alpha !== undefined) {
                parameters.withAlpha(params.alpha);
            }
            if (params.solver !== undefined) {
                parameters.withSolver(params.solver);
            }
        }
        this.parameters = parameters;
    }
    predict(x) {
        if (this.estimator === null) {
            throw new Error("The 'fit' method should called before the 'predict' method is called.");
        }
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        return this.estimator.predict(matrix.asF64());
    }
    fit(x, y) {
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof Float64Array) {
            throw new Error('Unsupported data type for input arrays.');
        }
        if (y instanceof BigInt64Array) {
            this.estimator = LogisticRegressionF64BigI64.fit(matrix.asF64(), y, this.parameters);
        }
        else if (y.every((val) => Number.isInteger(val))) {
            this.estimator = LogisticRegressionF64I64.fit(matrix.asF64(), y, this.parameters);
        }
        else {
            throw new Error('Unsupported data type for input arrays.');
        }
        return this;
    }
    serialize() {
        if (this.estimator === null) {
            throw new Error("The 'fit' method should called before the 'serialize' method is called.");
        }
        return this.estimator?.serialize();
    }
    deserialize(data) {
        try {
            let estimator = LogisticRegressionF64I64.deserialize(data);
            let lr = new LogisticRegression({});
            lr.estimator = estimator;
            return lr;
        }
        catch (e) {
            throw e;
        }
    }
    static deserialize(data, estimatorType) {
        let estimator;
        if (estimatorType === EstimatorType.F64BigI64) {
            estimator = LogisticRegressionF64BigI64.deserialize(data);
        }
        else if (estimatorType === EstimatorType.F64I64) {
            estimator = LogisticRegressionF64I64.deserialize(data);
        }
        else {
            throw new Error('Unsupported estimator type');
        }
        let instance = new LogisticRegression();
        instance.estimator = estimator;
        return instance;
    }
}
export default LogisticRegression;
