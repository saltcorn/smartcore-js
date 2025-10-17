import { DenseMatrix } from '../index.js';
/**
 * Converts input to DenseMatrix and tracks DataFrame columns
 */
function dataFrameToDenseMatrix(x, columns) {
    let targetColumns = Array.isArray(columns) ? columns : x.columnNames;
    let dataFrame = x.selectColumnsByName(targetColumns);
    return new DenseMatrix(dataFrame.getColumns(), { columnMajor: true });
}
export { dataFrameToDenseMatrix };
