import { LinearRegressionF64I64, LinearRegressionParameters, LinearRegressionF64F64, LinearRegressionF64BigI64, LinearRegressionF64BigU64, } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BasePredictor } from '../base_predictor.js';
import {} from '../base_estimator.js';
class LinearRegression extends BasePredictor {
    constructor(params) {
        const parameters = new LinearRegressionParameters();
        if (params?.solver) {
            parameters.withSolver(params.solver);
        }
        const config = params || {};
        super(parameters);
        this.name = LinearRegression.className;
        this.config = config;
        this.estimatorClasses = {
            bigI64: LinearRegressionF64BigI64,
            bigU64: LinearRegressionF64BigU64,
            i64: LinearRegressionF64I64,
            f64: LinearRegressionF64F64,
        };
    }
    fitEstimator(matrix, y) {
        const EstimatorClass = this.estimatorClasses[this._yType];
        if (EstimatorClass !== null) {
            return EstimatorClass.fit(matrix.asF64(), y, this.parameters);
        }
        else {
            throw new Error(`${this.name}: Unsupported data type for y '${y.constructor?.name || typeof y}'`);
        }
    }
    getComponentColumnName(index) {
        return `LR${index + 1}`;
    }
    predictMatrix(matrix) {
        return this.estimator.predict(matrix.asF64());
    }
    serialize() {
        this.ensureFitted('serialize');
        return {
            columns: this.columns,
            data: this.estimator.serialize(),
            params: this.config,
            yType: this._yType,
        };
    }
    static deserialize(data) {
        let instance = new LinearRegression(data.params);
        const EstimatorClass = instance.estimatorClasses[data.yType];
        if (EstimatorClass === null) {
            throw new Error(`${this.name}: Unexpected yType value '${data.yType}'`);
        }
        instance.estimator = EstimatorClass.deserialize(data.data);
        instance._isFitted = true;
        instance._yType = data.yType;
        return instance;
    }
}
LinearRegression.className = 'LinearRegression';
export default LinearRegression;
