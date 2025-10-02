type DataValue = number | bigint
type DataRecord = Record<string, DataValue>

interface DataFrameOptions {
  include?: string[]
  exclude?: string[]
}

class DataFrame {
  private readonly _columnNames: ReadonlyArray<string>
  private readonly _data: ReadonlyArray<DataRecord>

  constructor(data: DataRecord[], options: DataFrameOptions = {}) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Data must be a non-empty array.')
    }

    // Deep freeze data to prevent external mutations
    this._data = Object.freeze(data.map((record) => Object.freeze({ ...record })))

    const firstRecord = this._data[0]
    const allColumns = Object.keys(firstRecord)

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

    // Validate data integrity
    this.validateData()
  }

  /**
   * Validates that all records have values for all selected columns
   */
  private validateData(): void {
    this._data.forEach((record, idx) => {
      this._columnNames.forEach((colName) => {
        const value = record[colName]
        if (value === undefined) {
          throw new Error(`Record at index ${idx} is missing value for column '${colName}'.`)
        }
      })
    })
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
      throw new Error(`Unknown column name: '${columnName}'.`)
    }
    return this._data.map((record) => record[columnName])
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

  /**
   * Returns numeric columns only as number[][]
   */
  getNumericColumns(): number[][] {
    return this._columnNames.map((colName) => {
      const column = this.getColumnByName(colName)
      return column.map((value, idx) => {
        if (typeof value === 'bigint') {
          throw new Error(`Column '${colName}' at row ${idx} contains BigInt value. Use getBigIntColumns() instead.`)
        }
        return value
      })
    })
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
  getRow(idx: number): DataRecord {
    if (idx < 0 || idx >= this._data.length) {
      throw new Error(`Row index ${idx} out of bounds [0, ${this._data.length - 1}]`)
    }
    const record = this._data[idx]
    return Object.fromEntries(this._columnNames.map((colName) => [colName, record[colName]]))
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
    const invalidColumns = names.filter((name) => !this._columnNames.includes(name))
    if (invalidColumns.length > 0) {
      throw new Error(`Invalid column names: ${invalidColumns.join(', ')}`)
    }

    // Create new data with only selected columns
    const newData = this._data.map((record) => Object.fromEntries(names.map((name) => [name, record[name]])))

    return new DataFrame(newData as DataRecord[], { include: names })
  }

  /**
   * Filter rows based on a predicate function
   * @param {function(record: DataRecord, index: number): boolean} predicate - Predicate function
   */
  filter(predicate: (record: DataRecord, index: number) => boolean): DataFrame {
    const filteredData = this._data
      .map((record, idx) => {
        // Create a filtered record with only selected columns
        const filteredRecord = Object.fromEntries(this._columnNames.map((colName) => [colName, record[colName]]))
        return { record: filteredRecord, idx }
      })
      .filter(({ record, idx }) => predicate(record, idx))
      .map(({ record }) => record)

    if (filteredData.length === 0) {
      throw new Error('Filter resulted in empty DataFrame.')
    }

    return new DataFrame(filteredData as DataRecord[], { include: [...this._columnNames] })
  }

  /**
   * Maps each row to a new value using a transform function
   * @param {function(record: DataRecord, index: number): T} transform Transform function
   * @returns {T[]} Transformed data
   */
  map<T>(transform: (record: DataRecord, index: number) => T): T[] {
    return this._data.map((record, idx) => {
      const filteredRecord = Object.fromEntries(this._columnNames.map((colName) => [colName, record[colName]]))
      return transform(filteredRecord, idx)
    })
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

    return { min, max, mean, sum, count }
  }

  /**
   * @returns {DataRecord[]} - A plain JavaScript object representation
   */
  toJSON(): DataRecord[] {
    return this._data.map((record) =>
      Object.fromEntries(this._columnNames.map((colName) => [colName, record[colName]])),
    )
  }

  /**
   * @returns {DataFrame} - A deep copy of the DataFrame
   */
  clone(): DataFrame {
    return new DataFrame(this.toJSON() as DataRecord[], { include: [...this._columnNames] })
  }
}

export { DataFrame, type DataValue, type DataRecord, type DataFrameOptions }
