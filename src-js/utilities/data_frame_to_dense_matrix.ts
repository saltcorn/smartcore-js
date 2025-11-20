import type { DataFrame } from '../data_frame.js'
import { DenseMatrix } from '../core-bindings/index.js'
import { arrayToDenseMatrix } from './array_to_dense_matrix.js'

/**
 * Converts input to DenseMatrix and tracks DataFrame columns
 */
function dataFrameToDenseMatrix(x: DataFrame, columns?: string[]): DenseMatrix {
  let targetColumns = Array.isArray(columns) ? columns : x.columnNames
  let dataFrame = x.selectColumnsByName(targetColumns)
  return arrayToDenseMatrix(dataFrame.getColumns(), { columnMajor: true })
}

export { dataFrameToDenseMatrix }
