"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../core-bindings/index.js");
const base_predictor_js_1 = require("../base_predictor.js");
class CategoricalNB extends base_predictor_js_1.BasePredictor {
    constructor(params) {
        const parameters = new index_js_1.CategoricalNBParameters();
        const config = params || {};
        if (config.alpha) {
            parameters.withAlpha(config.alpha);
        }
        super(parameters);
        this.name = CategoricalNB.className;
        this.config = config;
        this.estimatorClasses = {
            bigU64: index_js_1.CategoricalNBBigU64,
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
        return `CNB${index + 1}`;
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
        let instance = new CategoricalNB(data.params);
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
CategoricalNB.className = 'CategoricalNB';
exports.default = CategoricalNB;
