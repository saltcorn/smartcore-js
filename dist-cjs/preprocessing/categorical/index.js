"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneHotEncoder = void 0;
const index_js_1 = require("../../index.js");
const index_js_2 = require("./estimator_providers_map/index.js");
class OneHotEncoder {
    constructor(params) {
        this.name = OneHotEncoder.className;
        this._isFitted = false;
        this.estimator = null;
        this.config = params;
        this.config.targetType = this.config.targetType ?? 'f32';
        const estimatorProvider = index_js_2.TransformerProvidersMap.get(this.config.targetType);
        if (!estimatorProvider) {
            throw new Error(`Invalid value for target type '${this.config.targetType}'`);
        }
        const parameters = estimatorProvider.parameters(this.config);
        this.estimatorProvider = estimatorProvider;
        this.parameters = parameters;
    }
    fit(x, y) {
        const matrix = index_js_1.utilities.inputTypeToDenseMatrix(x);
        this.estimator = this.estimatorProvider.estimator(matrix, y, this.parameters);
        this._isFitted = true;
        return this;
    }
    getComponentColumnName(index) {
        return `OneHotEncoder${index + 1}`;
    }
    ensureFitted(methodName) {
        if (!this._isFitted || this.estimator === null) {
            throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`);
        }
    }
    transform(matrix) {
        this.ensureFitted('transform');
        let denseMatrix = this.estimatorProvider.toMatrix(index_js_1.utilities.inputTypeToDenseMatrix(matrix));
        return new index_js_1.DenseMatrix(this.estimator.transform(denseMatrix));
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
        let instance = new OneHotEncoder(data.config);
        instance._deserialize(data.data);
        instance._isFitted = true;
        return instance;
    }
}
exports.OneHotEncoder = OneHotEncoder;
OneHotEncoder.className = 'OneHotEncoder';
