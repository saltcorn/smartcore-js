import type { DataFrame } from '../data_frame.js'
import { DenseMatrix, type DenseMatrixType } from '../core-bindings/index.js'
import { arrayToDenseMatrix } from './array_to_dense_matrix.js'

interface IDataFrameToDenseMatrixParameters {
  columns?: string[]
  numberType?: DenseMatrixType
}

/**
 * Converts input to DenseMatrix and tracks DataFrame columns
 */
function dataFrameToDenseMatrix(x: DataFrame, params?: IDataFrameToDenseMatrixParameters): DenseMatrix {
  let targetColumns = Array.isArray(params?.columns) ? params.columns : x.columnNames
  let dataFrame = x.selectColumnsByName(targetColumns)
  return arrayToDenseMatrix(dataFrame.getColumns(), { columnMajor: true, numberType: params?.numberType })
}

export { dataFrameToDenseMatrix }
