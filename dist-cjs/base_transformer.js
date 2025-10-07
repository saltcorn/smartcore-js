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
        if (x instanceof index_js_1.DenseMatrix)
            console.log(`[${this.name}]: In transform (x: ${x.nrows}, y: ${x.ncols})`);
        if (x instanceof data_frame_js_1.DataFrame)
            console.log(`[${this.name}]: In transform (x: ${x.rowsCount}, y: ${x.columnsCount})`);
        const isDataFrame = x instanceof data_frame_js_1.DataFrame;
        let matrix;
        // Handle selective column transformation
        if (isDataFrame && this.columns !== null) {
            // Transform only selected columns
            //   console.log(`${this.name}: Transform: `, this.columns)
            //   console.log(`${this.name}: x names: `, x.columnNames)
            const selected = x.selectColumnsByName(this.columns);
            matrix = this.toMatrix(selected);
            console.log(`[${this.name}]: Before transform (x: ${matrix.nrows}, y: ${matrix.ncols})`);
            const transformed = this.transformMatrix(matrix);
            console.log(`[${this.name}]: After transform (x: ${transformed.nrows}, y: ${transformed.ncols})`);
            // Get remaining columns and combine
            const remaining = this.getRemainingColumns(x, this.columns);
            //   console.log(`[${this.name}] Remaining: `, remaining?.columnNames)
            //   if (transformed instanceof DataFrame) console.log(`[${this.name}] Remaining: `, transformed?.columnNames)
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
        // console.log(`[${this.name}].getRemainingColumns`)
        const allColumns = x.columnNames;
        const remainingColumnNames = allColumns.filter((col) => !selectedColumns.includes(col));
        if (remainingColumnNames.length === 0) {
            return null;
        }
        // console.log(`[${this.name}] Remaining column names: `, remainingColumnNames)
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
        // if (transformed instanceof DataFrame)
        //   console.log(`[${this.name}].combineResults Transformed: `, transformed.columnNames)
        // console.log(`[${this.name}].combineResults Remaining: `, remaining.columnNames)
        // Ensure the rows in both the transformed and remaining matrices columns are equal
        const transformedRecords = transformedDf.toJSON();
        const remainingRecords = remaining.toJSON();
        // console.log(transformedRecords)
        // console.log(remainingRecords)
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
