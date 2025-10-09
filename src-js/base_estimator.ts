import { DenseMatrix, type InputType, type YType } from './index.js'
import { DataFrame } from './data_frame.js'
import type { Estimator } from './pipeline/index.js'

type YTypeKey = 'bigI64' | 'bigU64' | 'i64' | 'f64'

/**
 * Abstract base class for estimators
 */
abstract class BaseEstimator<TEstimator, TParams> implements Estimator<InputType, YType, any> {
  protected parameters: TParams
  protected estimator: TEstimator | null = null
  protected columns: string[] | null = null
  protected _isFitted: boolean = false
  protected _yType: YTypeKey | null = null

  public abstract readonly name: string

  constructor(parameters: TParams, selectedColumns?: string[]) {
    this.parameters = parameters
    this.columns = selectedColumns ?? null
  }

  /**
   * Check if model is fitted
   */
  get isFitted(): boolean {
    return this._isFitted
  }

  /**
   * Converts input to DenseMatrix and tracks DataFrame columns
   */
  protected toMatrix(x: InputType): DenseMatrix {
    if (x instanceof DenseMatrix) {
      return x
    }

    if (x instanceof DataFrame) {
      // Store columns for later use in transform
      if (!this._isFitted) {
        if (Array.isArray(this.columns) && this.columns.length > 0) {
          this.columns = x.columnNames.filter((n) => this.columns?.includes(n))
        } else {
          this.columns = x.columnNames
        }
      }

      return DenseMatrix.f64(x.getNumericColumns(), true)
    }

    return DenseMatrix.f64(x)
  }

  /**
   * Validates input data
   */
  protected validateInput(x: InputType): void {
    if (x === null || x === undefined) {
      throw new Error(`${this.name}: Input data cannot be null or undefined.`)
    }

    if (Array.isArray(x) && x.length === 0) {
      throw new Error(`${this.name}: Input data cannot be empty.`)
    }

    if (x instanceof DataFrame && x.rowsCount === 0) {
      throw new Error(`${this.name}: DataFrame cannot be empty.`)
    }
  }

  /**
   * @returns data containing values from only the selected columns
   */
  protected getMatrixWindow(x: InputType): InputType {
    const isDataFrame = x instanceof DataFrame

    // Handle selective column transformation
    if (isDataFrame && this.columns !== null) {
      return x.selectColumnsByName(this.columns)
    }

    return x
  }

  /**
   * A template for the fit method
   */
  fit(x: InputType, y: YType): this {
    this.validateInput(x)

    const matrix = this.toMatrix(this.getMatrixWindow(x))
    this.setYType(y)
    this.estimator = this.fitEstimator(matrix, y)
    this._isFitted = true

    return this
  }

  /**
   * Records the type of y. Useful when determining the output of methods such as predict
   */
  private setYType(y: YType): void {
    if (y instanceof Float64Array) {
      this._yType = 'f64'
    } else if (y instanceof BigInt64Array) {
      this._yType = 'bigI64'
    } else if (y instanceof BigUint64Array) {
      this._yType = 'bigU64'
    } else if (Array.isArray(y)) {
      this._yType = 'i64'
    } else {
      throw new Error(`${this.name}: unexpected type of y '${typeof y}'`)
    }
  }

  /**
   * @param {DenseMatrix} matrix
   */
  protected abstract fitEstimator(matrix: DenseMatrix, y: YType): TEstimator

  /**
   * Validates that the model is fitted before operations
   */
  protected ensureFitted(methodName: string): void {
    if (!this._isFitted || this.estimator === null) {
      throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`)
    }
  }

  /**
   * Converts DenseMatrix to DataFrame
   */
  protected toDataFrame(matrix: DenseMatrix): DataFrame {
    const rows = matrix.nrows
    const cols = matrix.ncols
    const matrixData = matrix.asF64()

    // Build records with component names
    const records: Record<string, number>[] = []

    for (let i = 0; i < rows; i++) {
      const record: Record<string, number> = {}
      for (let j = 0; j < cols; j++) {
        let columnName: string
        if (Array.isArray(this.columns) && this.columns.length !== 0) {
          if (j >= this.columns.length) {
            throw new Error(
              `${this.name}: Column names count mismatch. Expected: ${cols} Found: ${this.columns.length}`,
            )
          }
          columnName = this.columns[j]
        } else {
          columnName = this.getComponentColumnName(j)
        }
        record[columnName] = matrixData.get([i, j])
      }
      records.push(record)
    }

    return new DataFrame(records)
  }

  /**
   * Create a name for a column given its index
   */
  protected abstract getComponentColumnName(index: number): string

  /**
   * Get column names used during fit
   */
  get fittedColumns(): string[] | null {
    return this.columns ? [...this.columns] : null
  }

  /**
   * @returns An Object containing information that can be used to reinstantiate an identical instance to the serialized one
   */
  abstract serialize(): any
}

export { BaseEstimator, type YTypeKey }
