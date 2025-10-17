"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.denseMatrixToDataFrame = denseMatrixToDataFrame;
const data_frame_js_1 = require("../data_frame.js");
/**
 * Converts DenseMatrix to DataFrame
 */
function denseMatrixToDataFrame(matrix, columns) {
    const rows = matrix.nrows;
    const cols = matrix.ncols;
    const matrixData = matrix.asRsMatrix();
    if (!Array.isArray(columns)) {
        throw new Error(`[DataFrame] Expected 'columns' to be an array.`);
    }
    if (cols !== columns.length) {
        throw new Error(`[DataFrame]: Column names count mismatch. Expected: ${cols} Found: ${columns.length}`);
    }
    // Build records with component names
    const records = [];
    for (let i = 0; i < rows; i++) {
        const record = {};
        for (let j = 0; j < cols; j++) {
            record[columns[j]] = matrixData.get([i, j]);
        }
        records.push(record);
    }
    return new data_frame_js_1.DataFrame(records);
}
