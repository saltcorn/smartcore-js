type PrimitiveValue = number | bigint | string | boolean | null
type NestedValue = PrimitiveValue | NestedObject | NestedArray
type NestedObject = { [key: string]: NestedValue }
type NestedArray = NestedValue[]

type DataValue = number | bigint
type FlatRecord = Record<string, DataValue>

interface DataFrameOptions {
  include?: string[]
  exclude?: string[]
}

class DataFrame {
  private readonly _columnNames: ReadonlyArray<string>
  private readonly _data: ReadonlyArray<FlatRecord>
  private readonly _separator = '.'

  constructor(data: NestedObject[], options: DataFrameOptions = {}) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Data must be a non-empty array.')
    }

    // Flatten all records
    const flattenedData = data.map((record) => this.flattenObject(record))

    // Get all possible column names from flattened data
    const allColumns = this.getAllColumns(flattenedData)

    // Apply exclude first, then include
    let columns = options.exclude ? allColumns.filter((col) => !options.exclude!.includes(col)) : allColumns

    if (options.include && options.include.length > 0) {
      // Validate that included columns exist
      const invalidColumns = options.include.filter((col) => !allColumns.includes(col))
      if (invalidColumns.length > 0) {
        throw new Error(`Invalid columns in include: ${invalidColumns.join(', ')}.`)
      }
      columns = options.include
    }

    if (columns.length === 0) {
      throw new Error('No columns selected after applying include/exclude filters.')
    }

    this._columnNames = Object.freeze(columns)

    this._data = Object.freeze(
      flattenedData.map((record) => {
        const filtered: FlatRecord = {}
        for (const colName of this._columnNames) {
          const value = record[colName]
          if (value === undefined || value === null) {
            throw new Error(`Missing value for column '${colName}'.`)
          }
          filtered[colName] = this.toDataValue(value, colName)
        }
        return Object.freeze(filtered)
      }),
    )
  }

  /**
   * Flattens a nested object into a single-level object with dot notation
   * @param {NestedObject} obj - A nested object
   * @returns {Record<string, PrimitiveValue>} - A flattened object
   */
  private flattenObject(obj: NestedObject, prefix: string = ''): Record<string, PrimitiveValue> {
    const result: Record<string, PrimitiveValue> = {}

    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}${this._separator}${key}` : key

      if (value === null || value === undefined) {
        result[newKey] = value
      } else if (Array.isArray(value)) {
        // Flatten arrays by index
        value.forEach((item, idx) => {
          if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
            Object.assign(result, this.flattenObject(item as NestedObject, `${newKey}${this._separator}${idx}`))
          } else {
            result[`${newKey}${this._separator}${idx}`] = item as PrimitiveValue
          }
        })
      } else if (typeof value === 'object') {
        // Recursively flatten nested objects
        Object.assign(result, this.flattenObject(value as NestedObject, newKey))
      } else {
        // Primitive value
        result[newKey] = value as PrimitiveValue
      }
    }

    return result
  }

  /**
   * Gets all unique column names from flattened records
   * @param records
   */
  private getAllColumns(records: Record<string, PrimitiveValue>[]): string[] {
    const columnSet = new Set<string>()
    for (const record of records) {
      Object.keys(record).forEach((key) => columnSet.add(key))
    }
    return Array.from(columnSet).sort()
  }

  private toDataValue(value: PrimitiveValue, columnName: string): DataValue {
    if (typeof value === 'number' || typeof value === 'bigint') {
      return value
    }
    if (typeof value === 'string') {
      // Try to parse as number
      const parsed = parseFloat(value)
      if (!isNaN(parsed)) {
        return parsed
      }
    }
    if (typeof value === 'boolean') {
      return value ? 1 : 0
    }
    throw new Error(`Cannot convert value '${value}' in column '${columnName}' to number`)
  }

  /**
   * Returns a copy of column names
   */
  get columnNames(): string[] {
    return [...this._columnNames]
  }

  /**
   * Returns the number of columns
   */
  get columnsCount(): number {
    return this._columnNames.length
  }

  /**
   * Returns the number of rows
   */
  get rowsCount(): number {
    return this._data.length
  }

  /**
   * Returns the shape of the DataFrame as [rows, columns]
   */
  get shape(): [number, number] {
    return [this.rowsCount, this.columnsCount]
  }

  /**
   * Gets a column by its index
   * @param {number} idx - The index of the target column
   */
  getColumn(idx: number): DataValue[] {
    if (idx < 0 || idx >= this._columnNames.length) {
      throw new Error(`Column index ${idx} out of bounds [0, ${this._columnNames.length - 1}].`)
    }
    const columnName = this._columnNames[idx]
    return this.getColumnByName(columnName)
  }

  /**
   * Gets a column by its name
   * @param {string} columnName - The name of the target column
   */
  getColumnByName(columnName: string): DataValue[] {
    if (!this._columnNames.includes(columnName)) {
      throw new Error(`Unknown column name: '${columnName}'. Available columns: ${this._columnNames.join(', ')}`)
    }
    return this._data.map((record) => record[columnName])
  }

  /**
   * Returns all columns matching a prefix
   * @param {string} prefix - A string to use as the prefix
   * @returns {Map<string, DataValue>} Values for all matching columns mapped to the column names
   */
  getColumnsByPrefix(prefix: string): Map<string, DataValue[]> {
    const matchingColumns = this._columnNames.filter(
      (name) => name === prefix || name.startsWith(prefix + this._separator),
    )

    const result = new Map<string, DataValue[]>()
    for (const colName of matchingColumns) {
      result.set(colName, this.getColumnByName(colName))
    }

    return result
  }

  /**
   * Returns all columns as a 2D array (row-major order)
   */
  getRows(): DataValue[][] {
    return this._data.map((record) => this._columnNames.map((colName) => record[colName]))
  }

  /**
   * Returns all columns as a 2D array (column-major order)
   */
  getColumns(): DataValue[][] {
    return this._columnNames.map((colName) => this.getColumnByName(colName))
  }

  //   private reshapeMatrix(matrix: number[][]): number[][] {
  //     const rows = matrix.length
  //     if (rows === 0) return []
  //     const cols = matrix[0].length
  //     const reshapedMatrix: number[][] = Array(cols)
  //       .fill(null)
  //       .map(() => Array(rows))

  //     for (let i = 0; i < rows * cols; i++) {
  //       const sourceRow = Math.floor(i / cols)
  //       const sourceCol = i % rows

  //       const targetRow = Math.floor(i / rows)
  //       const targetCol = i % rows

  //       reshapedMatrix[targetRow][targetCol] = matrix[sourceRow][sourceCol]
  //     }

  //     return reshapedMatrix
  //   }

  /**
   * Returns numeric columns only as number[][]
   */
  getNumericColumns(): number[][] {
    // if (columnMajor)
    return this._columnNames.map((colName) => {
      const column = this.getColumnByName(colName)
      return column.map((value, idx) => {
        if (typeof value === 'bigint') {
          throw new Error(`Column '${colName}' at row ${idx} contains BigInt value. Use getBigIntColumns() instead.`)
        }
        return value
      })
    })
    // else {
    //   const numericColumns = this.getNumericColumns(true)
    //   return this.reshapeMatrix(numericColumns)
    // }
  }

  /**
   * Returns bigint columns only as bigint[][]
   */
  getBigIntColumns(): bigint[][] {
    return this._columnNames.map((colName) => {
      const column = this.getColumnByName(colName)
      return column.map((value, idx) => {
        if (typeof value !== 'bigint') {
          throw new Error(
            `Column '${colName}' at row ${idx} contains non-BigInt value. Use getNumericColumns() instead.`,
          )
        }
        return value
      })
    })
  }

  /**
   * Returns a row by its index
   * @param {number} idx - Index of the target row
   */
  getRow(idx: number): FlatRecord {
    if (idx < 0 || idx >= this._data.length) {
      throw new Error(`Row index ${idx} out of bounds [0, ${this._data.length - 1}]`)
    }
    return { ...this._data[idx] }
  }

  /**
   * Selects columns by their indices
   * @param {number[]} indices - An Array containing the indices of the target columns
   */
  selectColumns(indices: number[]): DataFrame {
    const columnNames = indices.map((idx, position) => {
      if (idx < 0 || idx >= this._columnNames.length) {
        throw new Error(
          `Invalid column index ${idx} at position ${position}. Valid range: [0, ${this._columnNames.length - 1}]`,
        )
      }
      return this._columnNames[idx]
    })
    return this.selectColumnsByName(columnNames)
  }

  /**
   * Selects columns by their names
   * @param names - An Array containing the names of the target columns
   */
  selectColumnsByName(names: string[]): DataFrame {
    // Validate column names
    // console.log('DataFrame: ', this._columnNames)
    const invalidColumns = names.filter((name) => !this._columnNames.includes(name))
    if (invalidColumns.length > 0) {
      throw new Error(`Invalid column names: ${invalidColumns.join(', ')}`)
    }

    // Create new data with only selected columns
    const newData = this._data.map((record) => {
      const filtered: NestedObject = {}
      for (const name of names) {
        filtered[name] = record[name]
      }
      return filtered
    })

    return new DataFrame(newData, { include: names })
  }

  /**
   * Selects all columns matching a prefix pattern
   * @param {string} prefix - Prefix to be used in filter
   */
  selectColumnsByPrefix(prefix: string): DataFrame {
    const matchingColumns = this._columnNames.filter(
      (name) => name === prefix || name.startsWith(prefix + this._separator),
    )

    if (matchingColumns.length === 0) {
      throw new Error(`No columns found with prefix '${prefix}'.`)
    }

    return this.selectColumnsByName([...matchingColumns])
  }

  /**
   * Filter rows based on a predicate function
   * @param {function(record: FlatRecord, index: number): boolean} predicate - Predicate function
   */
  filter(predicate: (record: FlatRecord, index: number) => boolean): DataFrame {
    const filteredData = this._data
      .map((record, idx) => ({ record, idx }))
      .filter(({ record, idx }) => predicate({ ...record }, idx))
      .map(({ record }) => ({ ...record }))

    if (filteredData.length === 0) {
      throw new Error('Filter resulted in empty DataFrame.')
    }

    return new DataFrame(filteredData as NestedObject[], { include: [...this._columnNames] })
  }

  /**
   * Maps each row to a new value using a transform function
   * @param {function(record: FlatRecord, index: number): T} transform Transform function
   * @returns {T[]} Transformed data
   */
  map<T>(transform: (record: FlatRecord, index: number) => T): T[] {
    return this._data.map((record, idx) => transform({ ...record }, idx))
  }

  /**
   * Returns column statistics (min, max, mean, sum) for numeric columns
   * @param {string} columnName Name of the target column
   */
  describe(columnName: string): {
    min: number
    max: number
    mean: number
    sum: number
    count: number
    std: number
  } {
    const column = this.getColumnByName(columnName)

    const numericColumn = column.map((value) => {
      if (typeof value === 'bigint') {
        throw new Error(`Column '${columnName}' contains BigInt values. Convert to Number first.`)
      }
      return value
    })

    const sum = numericColumn.reduce((acc, val) => acc + val, 0)
    const count = numericColumn.length
    const mean = sum / count
    const min = Math.min(...numericColumn)
    const max = Math.max(...numericColumn)

    // Calculate standard deviation
    const variance = numericColumn.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / count
    const std = Math.sqrt(variance)

    return { min, max, mean, sum, count, std }
  }

  describeAll(): Map<string, ReturnType<typeof this.describe>> {
    const result = new Map()
    for (const colName of this._columnNames) {
      try {
        result.set(colName, this.describe(colName))
      } catch (e) {
        // Skip non-numeric columns
      }
    }
    return result
  }

  /**
   * @returns {FlatRecord[]} - A plain JavaScript object representation
   */
  toJSON(): FlatRecord[] {
    return this._data.map((record) =>
      Object.fromEntries(this._columnNames.map((colName) => [colName, record[colName]])),
    )
  }

  /**
   * @returns {DataFrame} - A deep copy of the DataFrame
   */
  clone(): DataFrame {
    return new DataFrame(this.toJSON() as NestedObject[], { include: [...this._columnNames] })
  }
}

export { DataFrame, type DataValue, type FlatRecord, type NestedObject, type DataFrameOptions }
