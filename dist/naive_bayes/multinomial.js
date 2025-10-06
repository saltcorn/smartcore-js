import { MultinomialNBU64BigU64, MultinomialNBParameters } from '../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BasePredictor } from '../base_predictor.js';
import {} from '../base_estimator.js';
class MultinomialNB extends BasePredictor {
    constructor(params) {
        const parameters = new MultinomialNBParameters();
        const config = params || {};
        if (config.priors) {
            parameters.withPriors(config.priors);
        }
        if (config.alpha) {
            parameters.withAlpha(config.alpha);
        }
        super(parameters);
        this.name = MultinomialNB.className;
        this.config = config;
        this.estimatorClasses = {
            bigU64: MultinomialNBU64BigU64,
            bigI64: null,
            i64: null,
            f64: null,
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
        return `MNB${index + 1}`;
    }
    predictMatrix(matrix) {
        return this.estimator.predict(matrix.asU64());
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
        let instance = new MultinomialNB(data.params);
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
MultinomialNB.className = 'MultinomialNB';
export default MultinomialNB;
