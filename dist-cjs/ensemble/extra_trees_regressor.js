"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraTreesRegressor = void 0;
const index_js_1 = require("../../core-bindings/index.js");
const base_predictor_js_1 = require("../base_predictor.js");
class ExtraTreesRegressor extends base_predictor_js_1.BasePredictor {
    constructor(params) {
        const parameters = new index_js_1.ExtraTreesRegressorParameters();
        const config = params || {};
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
        super(parameters);
        this.name = ExtraTreesRegressor.className;
        this.config = config;
        this.estimatorClasses = {
            i64: index_js_1.ExtraTreesRegressorF64I64,
            bigI64: index_js_1.ExtraTreesRegressorF64BigI64,
            f64: index_js_1.ExtraTreesRegressorF64F64,
            bigU64: index_js_1.ExtraTreesRegressorF64BigU64,
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
        return `ETR${index + 1}`;
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
        let instance = new ExtraTreesRegressor(data.params);
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
exports.ExtraTreesRegressor = ExtraTreesRegressor;
ExtraTreesRegressor.className = 'ExtraTreesRegressor';
