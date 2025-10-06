"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTransformer = void 0;
const index_js_1 = require("./index.js");
const data_frame_js_1 = require("./data_frame.js");
const base_estimator_js_1 = require("./base_estimator.js");
/**
 * Abstract base class for transformers
 */
class BaseTransformer extends base_estimator_js_1.BaseEstimator {
    constructor(parameters) {
        super(parameters);
    }
    /**
     * A template for the transform method
     * @param {InputType} x
     */
    transform(x) {
        this.ensureFitted('transform');
        this.validateInput(x);
        const isDataFrame = x instanceof data_frame_js_1.DataFrame;
        let matrix;
        // Handle DataFrame column selection
        if (isDataFrame && this.columns !== null) {
            matrix = index_js_1.DenseMatrix.f64(x.selectColumnsByName(this.columns).getNumericColumns());
        }
        else {
            matrix = this.toMatrix(x);
        }
        // 'transformMatrix' implementation is provided by subclasses
        const transformed = this.transformMatrix(matrix);
        // Return same type as input
        return isDataFrame ? this.toDataFrame(transformed) : transformed;
    }
}
exports.BaseTransformer = BaseTransformer;
