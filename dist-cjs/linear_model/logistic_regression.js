"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../core-bindings/index.js");
const base_predictor_js_1 = require("../base_predictor.js");
class LogisticRegression extends base_predictor_js_1.BasePredictor {
    constructor(params) {
        const parameters = new index_js_1.LogisticRegressionParametersF64();
        const config = params || {};
        if (config.alpha !== undefined) {
            parameters.withAlpha(config.alpha);
        }
        if (config.solver !== undefined) {
            parameters.withSolver(config.solver);
        }
        super(parameters);
        this.name = LogisticRegression.className;
        this.config = config;
        this.estimatorClasses = {
            bigI64: index_js_1.LogisticRegressionF64BigI64,
            bigU64: index_js_1.LogisticRegressionF64BigU64,
            i64: index_js_1.LogisticRegressionF64I64,
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
        let instance = new LogisticRegression(data.params);
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
LogisticRegression.className = 'LogisticRegression';
exports.default = LogisticRegression;
