"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataFrameToDenseMatrix = dataFrameToDenseMatrix;
const index_js_1 = require("../index.js");
/**
 * Converts input to DenseMatrix and tracks DataFrame columns
 */
function dataFrameToDenseMatrix(x, columns) {
    let targetColumns = Array.isArray(columns) ? columns : x.columnNames;
    let dataFrame = x.selectColumnsByName(targetColumns);
    return new index_js_1.DenseMatrix(dataFrame.getColumns(), { columnMajor: true });
}
