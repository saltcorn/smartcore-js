import { RandomForestRegressorF64BigI64, RandomForestRegressorF64BigU64, RandomForestRegressorF64I64, RandomForestRegressorParameters, } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BasePredictor } from '../base_predictor.js';
import {} from '../base_estimator.js';
class RandomForestRegressor extends BasePredictor {
    constructor(params) {
        const parameters = new RandomForestRegressorParameters();
        const config = params || {};
        if (config) {
            if (config.maxDepth !== undefined) {
                parameters.withMaxDepth(config.maxDepth);
            }
            if (config.minSamplesLeaf !== undefined) {
                parameters.withMinSamplesLeaf(config.minSamplesLeaf);
            }
            if (config.minSamplesSplit !== undefined) {
                parameters.withMinSamplesSplit(config.minSamplesSplit);
            }
            if (config.nTrees !== undefined) {
                parameters.withNTrees(config.nTrees);
            }
            if (config.m !== undefined) {
                parameters.withM(config.m);
            }
            if (config.keepSamples !== undefined) {
                parameters.withKeepSamples(config.keepSamples);
            }
            if (config.seed !== undefined) {
                parameters.withSeed(config.seed);
            }
        }
        super(parameters);
        this.name = RandomForestRegressor.className;
        this.config = config;
        this.estimatorClasses = {
            bigI64: RandomForestRegressorF64BigI64,
            bigU64: RandomForestRegressorF64BigU64,
            i64: RandomForestRegressorF64I64,
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
        return `RFR${index + 1}`;
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
        let instance = new RandomForestRegressor(data.params);
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
RandomForestRegressor.className = 'RandomForestRegressor';
export { RandomForestRegressor };
