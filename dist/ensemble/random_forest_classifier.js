"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomForestClassifier = void 0;
const index_js_1 = require("../../core-bindings/index.js");
const index_js_2 = require("../linalg/index.js");
var EstimatorType;
(function (EstimatorType) {
    EstimatorType[EstimatorType["F64I64"] = 0] = "F64I64";
    EstimatorType[EstimatorType["F64BigI64"] = 1] = "F64BigI64";
    EstimatorType[EstimatorType["F64BigU64"] = 2] = "F64BigU64";
})(EstimatorType || (EstimatorType = {}));
class RandomForestClassifier {
    parameters;
    estimator = null;
    constructor(params) {
        this.parameters = new index_js_1.RandomForestClassifierParameters();
        if (params) {
            if (params.criterion !== undefined) {
                this.parameters.withCriterion(params.criterion);
            }
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
        }
    }
    fit(x, y) {
        let matrix = x instanceof index_js_2.DenseMatrix ? x : index_js_2.DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof Float64Array) {
            throw new Error('Unsupported data type for input arrays.');
        }
        else if (y instanceof BigInt64Array) {
            this.estimator = index_js_1.RandomForestClassifierF64BigI64.fit(matrix.asF64(), y, this.parameters);
        }
        else if (y instanceof BigUint64Array) {
            this.estimator = index_js_1.RandomForestClassifierF64BigU64.fit(matrix.asF64(), y, this.parameters);
        }
        else if (y.every((val) => Number.isInteger(val))) {
            this.estimator = index_js_1.RandomForestClassifierF64I64.fit(matrix.asF64(), y, this.parameters);
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
        let matrix = x instanceof index_js_2.DenseMatrix ? x : index_js_2.DenseMatrix.f64(x);
        return this.estimator.predict(matrix.asF64());
    }
    serialize() {
        return this.estimator?.serialize();
    }
    static deserialize(data, estimatorType) {
        let instance = new RandomForestClassifier();
        switch (estimatorType) {
            case EstimatorType.F64BigI64:
                instance.estimator = index_js_1.RandomForestClassifierF64BigI64.deserialize(data);
                break;
            case EstimatorType.F64BigU64:
                instance.estimator = index_js_1.RandomForestClassifierF64BigU64.deserialize(data);
                break;
            case EstimatorType.F64I64:
                instance.estimator = index_js_1.RandomForestClassifierF64I64.deserialize(data);
                break;
            default:
                throw new Error(`Unrecognized estimator type: '${estimatorType}'`);
        }
        return instance;
    }
}
exports.RandomForestClassifier = RandomForestClassifier;
