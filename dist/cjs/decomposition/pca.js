"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PCA = void 0;
const index_js_1 = require("../../core-bindings/index.js");
const index_js_2 = require("../linalg/index.js");
const base_transformer_js_1 = require("../base_transformer.js");
class PCA extends base_transformer_js_1.BaseTransformer {
    constructor(params) {
        const parameters = new index_js_1.PCAParameters();
        // Store config for serialization
        const config = params || {};
        if (config.nComponents !== undefined) {
            parameters.withNComponents(config.nComponents);
        }
        if (config.correlationMatrix !== undefined) {
            parameters.useCorrelationMatrix(config.correlationMatrix);
        }
        super(parameters);
        this.name = PCA.className;
        this.config = config;
    }
    fitEstimator(matrix) {
        return index_js_1.PCAF64.fit(matrix.asF64(), this.parameters);
    }
    transformMatrix(matrix) {
        return new index_js_2.DenseMatrix(this.estimator.transform(matrix.asF64()));
    }
    getComponentColumnName(index) {
        return `PC${index + 1}`;
    }
    serialize() {
        this.ensureFitted('serialize');
        return {
            columns: this.columns,
            data: this.estimator.serialize(),
            params: this.config,
        };
    }
    /**
     * Creates instance from serialized data
     */
    static deserialize(serializedData) {
        const estimator = index_js_1.PCAF64.deserialize(serializedData.data);
        const instance = new PCA(serializedData.params);
        instance.estimator = estimator;
        instance.columns = serializedData.columns;
        instance._isFitted = true;
        return instance;
    }
}
exports.PCA = PCA;
PCA.className = 'PCA';
