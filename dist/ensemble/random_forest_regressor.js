import { RandomForestRegressorF64BigI64, RandomForestRegressorF64BigU64, RandomForestRegressorF64I64, RandomForestRegressorParameters, } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
var EstimatorType;
(function (EstimatorType) {
    EstimatorType[EstimatorType["F64I64"] = 0] = "F64I64";
    EstimatorType[EstimatorType["F64BigI64"] = 1] = "F64BigI64";
    EstimatorType[EstimatorType["F64BigU64"] = 2] = "F64BigU64";
})(EstimatorType || (EstimatorType = {}));
class RandomForestRegressor {
    constructor(params) {
        this.estimator = null;
        this.name = RandomForestRegressor.className;
        this.parameters = new RandomForestRegressorParameters();
        if (params) {
            if (params.maxDepth !== undefined) {
                this.parameters.withMaxDepth(params.maxDepth);
            }
            if (params.minSamplesLeaf !== undefined) {
                this.parameters.withMinSamplesLeaf(params.minSamplesLeaf);
            }
            if (params.minSamplesSplit !== undefined) {
                this.parameters.withMinSamplesSplit(params.minSamplesSplit);
            }
            if (params.nTrees !== undefined) {
                this.parameters.withNTrees(params.nTrees);
            }
            if (params.m !== undefined) {
                this.parameters.withM(params.m);
            }
            if (params.keepSamples !== undefined) {
                this.parameters.withKeepSamples(params.keepSamples);
            }
            if (params.seed !== undefined) {
                this.parameters.withSeed(params.seed);
            }
        }
    }
    fit(x, y) {
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof Float64Array) {
            throw new Error('Unsupported data type for input arrays.');
        }
        else if (y instanceof BigInt64Array) {
            this.estimator = RandomForestRegressorF64BigI64.fit(matrix.asF64(), y, this.parameters);
        }
        else if (y instanceof BigUint64Array) {
            this.estimator = RandomForestRegressorF64BigU64.fit(matrix.asF64(), y, this.parameters);
        }
        else if (y.every((val) => Number.isInteger(val))) {
            this.estimator = RandomForestRegressorF64I64.fit(matrix.asF64(), y, this.parameters);
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
        let instance = new RandomForestRegressor();
        switch (estimatorType) {
            case EstimatorType.F64BigI64:
                instance.estimator = RandomForestRegressorF64BigI64.deserialize(data);
                break;
            case EstimatorType.F64BigU64:
                instance.estimator = RandomForestRegressorF64BigU64.deserialize(data);
                break;
            case EstimatorType.F64I64:
                instance.estimator = RandomForestRegressorF64I64.deserialize(data);
                break;
            default:
                throw new Error(`Unrecognized estimator type: '${estimatorType}'`);
        }
        return instance;
    }
}
RandomForestRegressor.className = 'RandomForestRegressor';
export { RandomForestRegressor };
