"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBSCAN = void 0;
const estimator_providers_js_1 = require("./estimator_providers.js");
class DBSCAN {
    constructor(params) {
        this.name = DBSCAN.className;
        this._isFitted = false;
        this.estimator = null;
        const config = params || {};
        this.config = config;
        this.config.numberType = this.config.numberType ?? 'f32';
        this.config.distanceType = this.config.distanceType ?? 'euclidian';
        const distanceTypeMap = estimator_providers_js_1.EstimatorProviders.get(this.config.numberType);
        if (!distanceTypeMap) {
            throw new Error(`Unknown number type '${this.config.numberType}'`);
        }
        const estimatorProvider = distanceTypeMap.get(this.config.distanceType);
        if (!estimatorProvider) {
            throw new Error(`Unknown distance type '${this.config.distanceType}' for '${this.config.numberType}'`);
        }
        const parameters = estimatorProvider.parameters(this.config);
        this.estimatorProvider = estimatorProvider;
        this.parameters = parameters;
    }
    fit(x, y) {
        this.estimator = this.estimatorProvider.estimator(x, y, this.parameters);
        this._isFitted = true;
        return this;
    }
    getComponentColumnName(index) {
        return `DBSCAN${index + 1}`;
    }
    ensureFitted(methodName) {
        if (!this._isFitted || this.estimator === null) {
            throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`);
        }
    }
    predict(matrix) {
        this.ensureFitted('predict');
        let denseMatrix = this.estimatorProvider.toMatrix(matrix);
        return this.estimator.predict(denseMatrix);
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
        let instance = new DBSCAN(data.config);
        instance._deserialize(data.data);
        instance._isFitted = true;
        return instance;
    }
}
exports.DBSCAN = DBSCAN;
DBSCAN.className = 'DBSCAN';
