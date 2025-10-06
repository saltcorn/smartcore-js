"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../core-bindings/index.js");
const base_predictor_js_1 = require("../base_predictor.js");
class RidgeRegression extends base_predictor_js_1.BasePredictor {
    constructor(params) {
        const parameters = new index_js_1.RidgeRegressionF64Parameters();
        const config = params || {};
        if (config?.solver) {
            parameters.withSolver(config.solver);
        }
        super(parameters);
        this.name = RidgeRegression.className;
        this.config = config;
        this.estimatorClasses = {
            bigI64: index_js_1.RidgeRegressionF64BigI64,
            bigU64: index_js_1.RidgeRegressionF64BigU64,
            i64: index_js_1.RidgeRegressionF64I64,
            f64: index_js_1.RidgeRegressionF64F64,
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
exports.default = RidgeRegression;
