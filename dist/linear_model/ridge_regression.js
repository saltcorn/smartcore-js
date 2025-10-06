import { RidgeRegressionF64I64, RidgeRegressionF64Parameters, RidgeRegressionF64F64, RidgeRegressionF64BigI64, RidgeRegressionF64BigU64, } from '../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import {} from '../base_estimator.js';
import { BasePredictor } from '../base_predictor.js';
class RidgeRegression extends BasePredictor {
    constructor(params) {
        const parameters = new RidgeRegressionF64Parameters();
        const config = params || {};
        if (config?.solver) {
            parameters.withSolver(config.solver);
        }
        super(parameters);
        this.name = RidgeRegression.className;
        this.config = config;
        this.estimatorClasses = {
            bigI64: RidgeRegressionF64BigI64,
            bigU64: RidgeRegressionF64BigU64,
            i64: RidgeRegressionF64I64,
            f64: RidgeRegressionF64F64,
        };
    }
    fitEstimator(matrix, y) {
        const EstimatorClass = this.estimatorClasses[this._yType];
        return EstimatorClass.fit(matrix.asF64(), y, this.parameters);
    }
    getComponentColumnName(index) {
        return `RR${index + 1}`;
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
        let instance = new RidgeRegression(data.params);
        const EstimatorClass = instance.estimatorClasses[data.yType];
        instance.estimator = EstimatorClass.deserialize(data.data);
        instance._isFitted = true;
        instance._yType = data.yType;
        return instance;
    }
}
RidgeRegression.className = 'RidgeRegression';
export default RidgeRegression;
