import { DataFrame } from '../data_frame.js'
import type { DenseMatrix } from '../index.js'

/**
 * Converts DenseMatrix to DataFrame
 */
function denseMatrixToDataFrame(matrix: DenseMatrix, columns: string[]): DataFrame {
  const rows = matrix.nrows
  const cols = matrix.ncols
  const matrixData = matrix.asRsMatrix()

  if (!Array.isArray(columns)) {
    throw new Error(`[DataFrame] Expected 'columns' to be an array.`)
  }

  if (cols !== columns.length) {
    throw new Error(`[DataFrame]: Column names count mismatch. Expected: ${cols} Found: ${columns.length}`)
  }

  // Build records with component names
  const records: Record<string, number | bigint>[] = []

  for (let i = 0; i < rows; i++) {
    const record: Record<string, number | bigint> = {}
    for (let j = 0; j < cols; j++) {
      record[columns[j]] = matrixData.get([i, j])
    }
    records.push(record)
  }

  return new DataFrame(records)
}

export { denseMatrixToDataFrame }
