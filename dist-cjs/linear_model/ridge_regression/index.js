"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RidgeRegression = void 0;
const index_js_1 = require("../../index.js");
const index_js_2 = require("./estimator_providers_map/index.js");
const data_frame_js_1 = require("../../data_frame.js");
class RidgeRegression {
    constructor(params) {
        this.name = RidgeRegression.className;
        this.config = {};
        this._isFitted = false;
        this.estimator = null;
        this.config = params ?? {};
        this.config.featureType = this.config.featureType ?? 'f32';
        const estimatorProvidersMap = index_js_2.EstimatorProvidersMap.get(this.config.featureType);
        if (!estimatorProvidersMap) {
            throw new Error(`Invalid value for feature type '${this.config.featureType}'`);
        }
        this.config.targetType = this.config.targetType ?? 'f32';
        const estimatorProvider = estimatorProvidersMap.get(this.config.targetType);
        if (!estimatorProvider) {
            throw new Error(`Invalid value for target type '${this.config.targetType}'`);
        }
        const parameters = estimatorProvider.parameters(this.config);
        this.estimatorProvider = estimatorProvider;
        this.parameters = parameters;
    }
    get columns() {
        return this.config.columns ?? null;
    }
    fit(x, y) {
        let matrix;
        if (x instanceof data_frame_js_1.DataFrame && this.columns !== null && this.columns.length !== 0)
            matrix = index_js_1.utilities.dataFrameToDenseMatrix(x, this.columns);
        else
            matrix = index_js_1.utilities.inputTypeToDenseMatrix(x);
        this.estimator = this.estimatorProvider.estimator(matrix, y, this.parameters);
        this._isFitted = true;
        return this;
    }
    getComponentColumnName(index) {
        return `RidgeRegression${index + 1}`;
    }
    ensureFitted(methodName) {
        if (!this._isFitted || this.estimator === null) {
            throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`);
        }
    }
    predict(x) {
        this.ensureFitted('predict');
        if (x instanceof data_frame_js_1.DataFrame) {
            const columns = Array.isArray(this.columns) ? this.columns : x.columnNames;
            const matrix = index_js_1.utilities.dataFrameToDenseMatrix(x, columns);
            const matrixRs = this.estimatorProvider.toMatrix(matrix);
            return this.estimator.predict(matrixRs);
        }
        const matrixRs = this.estimatorProvider.toMatrix(index_js_1.utilities.inputTypeToDenseMatrix(x));
        return this.estimator.predict(matrixRs);
    }
    serialize() {
        this.ensureFitted('serialize');
        return {
            data: this.estimator.serialize(),
            config: this.config,
        };
    }
    _deserialize(data) {
        if (this._isFitted) {
            throw new Error("Cannot call 'deserialize' on a fitted instance!");
        }
        this.estimator = this.estimatorProvider.deserialize(data);
        return this;
    }
    static deserialize(data) {
        let instance = new RidgeRegression(data.config);
        instance._deserialize(data.data);
        instance._isFitted = true;
        return instance;
    }
}
exports.RidgeRegression = RidgeRegression;
RidgeRegression.className = 'RidgeRegression';
