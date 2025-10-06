"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../core-bindings/index.js");
const index_js_2 = require("../linalg/index.js");
const base_transformer_js_1 = require("../base_transformer.js");
class StandardScaler extends base_transformer_js_1.BaseTransformer {
    constructor(params) {
        const parameters = new index_js_1.StandardScalerParameters();
        const config = params || {};
        super(parameters);
        this.name = StandardScaler.className;
        this.config = config;
    }
    fitEstimator(matrix) {
        return new index_js_1.StandardScalerF64(matrix.asF64(), this.parameters);
    }
    transformMatrix(matrix) {
        return new index_js_2.DenseMatrix(this.estimator.transform(matrix.asF64()));
    }
    getComponentColumnName(index) {
        return `SS${index + 1}`;
    }
    serialize() {
        this.ensureFitted('serialize');
        return {
            columns: this.columns,
            data: this.estimator.serialize(),
            params: this.config,
        };
    }
    static deserialize(serializedData) {
        const estimator = index_js_1.StandardScalerF64.deserialize(serializedData.data);
        const instance = new StandardScaler(serializedData.params);
        instance.estimator = estimator;
        instance.columns = serializedData.columns;
        instance._isFitted = true;
        return instance;
    }
}
StandardScaler.className = 'StandardScaler';
exports.default = StandardScaler;
