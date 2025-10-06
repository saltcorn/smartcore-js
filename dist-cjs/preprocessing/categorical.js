"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../core-bindings/index.js");
const index_js_2 = require("../linalg/index.js");
const base_transformer_js_1 = require("../base_transformer.js");
class OneHotEncoder extends base_transformer_js_1.BaseTransformer {
    constructor(params) {
        const parameters = new index_js_1.OneHotEncoderParameters(params.categoricalParams);
        super(parameters);
        this.name = OneHotEncoder.className;
    }
    fitEstimator(matrix) {
        return new index_js_1.OneHotEncoderF64(matrix.asF64(), this.parameters);
    }
    transformMatrix(matrix) {
        return new index_js_2.DenseMatrix(this.estimator.transform(matrix.asF64()));
    }
    getComponentColumnName(index) {
        return `OHE${index + 1}`;
    }
    serialize() {
        this.ensureFitted('serialize');
        throw new Error(`${this.name}: Unimplemented!`);
    }
}
OneHotEncoder.className = 'OneHotEncoder';
exports.default = OneHotEncoder;
