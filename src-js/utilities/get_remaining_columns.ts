import type { DataFrame } from '../data_frame.js'

/**
 * Gets columns that were are not selected
 */
function getRemainingColumns(x: DataFrame, selectedColumns: string[]): DataFrame | null {
  const allColumns = x.columnNames
  const remainingColumnNames = allColumns.filter((col) => !selectedColumns.includes(col))

  if (remainingColumnNames.length === 0) {
    return null
  }

  return x.selectColumnsByName(remainingColumnNames)
}

export { getRemainingColumns }
