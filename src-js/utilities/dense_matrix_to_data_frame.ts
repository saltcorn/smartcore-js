import { DataFrame } from '../data_frame.js'
import { DenseMatrix } from '../core-bindings/index.js'

/**
 * Converts DenseMatrix to DataFrame
 */
function denseMatrixToDataFrame(matrix: DenseMatrix, columns: string[]): DataFrame {
  const [rows, cols] = matrix.shape()

  if (!Array.isArray(columns)) {
    throw new Error(`[DataFrame] Expected 'columns' to be an array.`)
  }

  if (cols !== BigInt(columns.length)) {
    throw new Error(`[DataFrame]: Column names count mismatch. Expected: ${cols} Found: ${columns.length}`)
  }

  // Build records with component names
  const records: Record<string, number | bigint>[] = []

  for (let i = 0n; i < rows; i++) {
    const record: Record<string, number | bigint> = {}
    for (let j = 0n; j < cols; j++) {
      record[columns[Number(j)]] = matrix.get([i, j]).field0
    }
    records.push(record)
  }

  return new DataFrame(records)
}

export { denseMatrixToDataFrame }
