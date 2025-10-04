import { KMeansF64BigI64, KMeansF64I64, KMeansParameters, KMeansF64F64 } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BasePredictor } from '../base_predictor.js';
import {} from '../linalg/index.js';
class KMeans extends BasePredictor {
    constructor(params) {
        const parameters = new KMeansParameters();
        let config = params || {};
        if (config.maxIter !== undefined) {
            parameters.withMaxIter(config.maxIter);
        }
        if (config.k !== undefined) {
            parameters.withK(config.k);
        }
        super(parameters);
        this.name = KMeans.className;
        this.config = config;
        this.estimatorClasses = {
            bigI64: KMeansF64BigI64,
            f64: KMeansF64F64,
            i64: KMeansF64I64,
            bigU64: null,
        };
    }
    fitEstimator(matrix, y) {
        const EstimatorClass = this.estimatorClasses[this._yType];
        if (EstimatorClass !== null) {
            return EstimatorClass.fit(matrix.asF64(), this.parameters);
        }
        else {
            throw new Error(`${this.name}: Unsupported data type for y '${y.constructor?.name || typeof y}'`);
        }
    }
    getComponentColumnName(index) {
        return `KM${index + 1}`;
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
        let instance = new KMeans(data.params);
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
KMeans.className = 'KMeans';
export { KMeans };
