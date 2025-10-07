"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePredictor = void 0;
const index_js_1 = require("./index.js");
const data_frame_js_1 = require("./data_frame.js");
const base_estimator_js_1 = require("./base_estimator.js");
/**
 * Abstract base class for predictors
 */
class BasePredictor extends base_estimator_js_1.BaseEstimator {
    constructor(parameters) {
        super(parameters);
    }
    /**
     * A template for the transform method
     * @param {InputType} x
     */
    predict(x) {
        this.ensureFitted('transform');
        this.validateInput(x);
        if (x instanceof index_js_1.DenseMatrix)
            console.log(`[${this.name}].predict (x: ${x.nrows}, y: ${x.ncols})`);
        if (x instanceof data_frame_js_1.DataFrame)
            console.log(`[${this.name}].predict (x: ${x.rowsCount}, y: ${x.columnsCount}) `);
        const isDataFrame = x instanceof data_frame_js_1.DataFrame;
        let matrix;
        // Handle DataFrame column selection
        if (isDataFrame && this.columns !== null) {
            matrix = index_js_1.DenseMatrix.f64(x.selectColumnsByName(this.columns).getNumericColumns(), true);
        }
        else {
            matrix = this.toMatrix(x);
        }
        // 'predictMatrix' implementation is provided by subclasses
        return this.predictMatrix(matrix);
    }
}
exports.BasePredictor = BasePredictor;
