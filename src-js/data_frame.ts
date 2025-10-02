class DataFrame {
  private _columnNames: string[]

  constructor(
    private data: Record<string, number | bigint>[],
    include?: string[],
    exclude?: string[],
  ) {
    if (data.length === 0) throw new Error('No data provided.')
    const firstRecord = data[0]
    const entries = DataFrame.excludeEntries(Object.entries(firstRecord), exclude)
    if (Array.isArray(include) && include.length !== 0) {
      this._columnNames = include
    } else {
      this._columnNames = entries.map(([key]) => key)
    }
  }

  static excludeEntries(entries: [string, number | bigint][], exclude?: string[]): [string, number | bigint][] {
    if (!Array.isArray(exclude) || exclude.length === 0) return entries
    return entries.filter(([k]) => {
      return !(k in exclude)
    })
  }

  get columnNames(): string[] {
    return this._columnNames
  }

  get columnsCount(): number {
    return this._columnNames.length
  }

  get rowsCount(): number {
    return this.data.length
  }

  getColumn(idx: number): (number | bigint)[] {
    let columnName = this._columnNames[idx]
    return this.getColumnByName(columnName)
  }

  getColumnByName(columnName: string): (number | bigint)[] {
    if (!(columnName in this.columnNames)) {
      throw new Error(`Unknown column name: '${columnName}'.`)
    }
    return this.data.reduce(
      (acc, record) => {
        acc.push(record[columnName])
        return acc
      },
      [] as (number | bigint)[],
    )
  }

  getColumns(): number[][] {
    return this.data.map((record, idx) => {
      let orderedValues = []
      for (let name in this._columnNames) {
        let value = record[name]
        if (!value && value != 0) {
          throw new Error(`Record at index ${idx} does not have a value for the column ${name}`)
        }
        if (typeof value === 'bigint') {
          throw new Error(`Value of data[${name}] is a Big Integer`)
        }
        orderedValues.push(value)
      }
      return orderedValues
    })
  }

  getColumnsBig(): bigint[][] {
    return this.data.map((record, idx) => {
      let orderedValues = []
      for (let name in this._columnNames) {
        let value = record[name]
        if (!value && value != 0) {
          throw new Error(`Record at index ${idx} does not have a value for the column ${name}`)
        }
        if (typeof value !== 'bigint') {
          throw new Error(`Value of data[${name}] is not a Big Integer`)
        }
        orderedValues.push(value)
      }
      return orderedValues
    })
  }

  selectColumns(indices: number[]): DataFrame {
    const columnNames = indices.map((idx, idxIdx) => {
      if (idx < 0 || idx >= this._columnNames.length) {
        throw new Error(`Invalid index '${idx}' at pos ${idxIdx}`)
      }
      return this._columnNames[idx]
    })
    return this.selectColumnsByName(columnNames)
  }

  selectColumnsByName(names: string[]): DataFrame {
    const newData: Record<string, number | bigint>[] = []
    this.data.forEach((record, idx) => {
      let recordSubset: Record<string, number | bigint> = {}
      for (let name in names) {
        let value = record[name]
        if (!value && value != 0) {
          throw new Error(`Record at index ${idx} does not have a value for the column ${name}`)
        }
        recordSubset[name] = value
      }
      newData.push(recordSubset)
    })
    return new DataFrame(newData)
  }
}

export { DataFrame }
