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
    constructor(parameters, selectedColumns) {
        super(parameters, selectedColumns);
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
        // Handle selective column transformation
        if (isDataFrame && this.columns !== null) {
            // Transform only selected columns
            const selected = x.selectColumnsByName(this.columns);
            matrix = this.toMatrix(selected);
            const transformed = this.transformMatrix(matrix);
            // Get remaining columns and combine
            const remaining = this.getRemainingColumns(x, this.columns);
            return this.combineResults(transformed, remaining);
        }
        matrix = this.toMatrix(x);
        // 'transformMatrix' implementation is provided by subclasses
        const transformed = this.transformMatrix(matrix);
        // Return same type as input
        return isDataFrame ? this.toDataFrame(transformed) : transformed;
    }
    /**
     * Gets columns that were not selected for transformation
     */
    getRemainingColumns(x, selectedColumns) {
        const allColumns = x.columnNames;
        const remainingColumnNames = allColumns.filter((col) => !selectedColumns.includes(col));
        if (remainingColumnNames.length === 0) {
            return null;
        }
        return x.selectColumnsByName(remainingColumnNames);
    }
    /**
     * Combines transformed columns with remaining untransformed columns
     */
    combineResults(transformed, remaining) {
        const transformedDf = transformed instanceof index_js_1.DenseMatrix ? this.toDataFrame(transformed) : transformed;
        if (remaining === null) {
            return transformedDf;
        }
        // Ensure the rows in both the transformed and remaining matrices columns are equal
        const transformedRecords = transformedDf.toJSON();
        const remainingRecords = remaining.toJSON();
        if (transformedRecords.length !== remainingRecords.length) {
            throw new Error(`${this.name}: Row count mistmatch. Transformed: ${transformedRecords.length}, Remaining: ${remainingRecords.length}`);
        }
        // Merge records
        const combinedRecords = transformedRecords.map((transformedRecord, idx) => ({
            ...transformedRecord,
            ...remainingRecords[idx],
        }));
        const transformedColumns = transformedDf.columnNames;
        const remainingColumns = remaining.columnNames;
        return new data_frame_js_1.DataFrame(combinedRecords, {
            include: [...transformedColumns, ...remainingColumns],
        });
    }
}
exports.BaseTransformer = BaseTransformer;
