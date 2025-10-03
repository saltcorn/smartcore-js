import { DenseMatrix, type XType, type YType } from '../index.js'
import { DataFrame } from '../data_frame.js'
import type { Estimator, Transformer } from '../pipeline/index.js'

/**
 * Abstract base class for decomposition algorithms
 * Serves as a template for PCA and SVD
 */
abstract class BaseDecomposition<TEstimator, TParams>
  implements Estimator<XType | DataFrame, YType, any>, Transformer<XType | DataFrame>
{
  protected parameters: TParams
  protected estimator: TEstimator | null = null
  protected columns: string[] | null = null
  protected _isFitted: boolean = false

  public abstract readonly name: string

  constructor(parameters: TParams) {
    this.parameters = parameters
  }

  /**
   * Check if model is fitted
   */
  get isFitted(): boolean {
    return this._isFitted
  }

  /**
   * Converts input to DenseMatrix and tracks DataFrame columns
   * @param {XType | DataFrame} x
   */
  protected toMatrix(x: XType | DataFrame): DenseMatrix {
    if (x instanceof DenseMatrix) {
      return x
    }

    if (x instanceof DataFrame) {
      // Store columns for later use in transform
      if (!this._isFitted) {
        this.columns = x.columnNames
      }
      return DenseMatrix.f64(x.getNumericColumns())
    }

    return DenseMatrix.f64(x)
  }

  /**
   * Validates input data
   * @param {XType | DataFrame} x
   */
  protected validateInput(x: XType | DataFrame): void {
    if (x === null || x === undefined) {
      throw new Error('Input data cannot be null or undefined.')
    }

    if (Array.isArray(x) && x.length === 0) {
      throw new Error('Input data cannot be empty.')
    }

    if (x instanceof DataFrame && x.rowsCount === 0) {
      throw new Error('DataFrame cannot be empty.')
    }
  }

  /**
   * A template for the fit method
   * @param {XType | DataFrame} x
   * @param {YType} y
   */
  fit(x: XType | DataFrame, _y?: YType): this {
    this.validateInput(x)
    const matrix = this.toMatrix(x)

    // Hook method provide by subclass
    this.estimator = this.fitEstimator(matrix)
    this._isFitted = true

    return this
  }

  /**
   * @param {DenseMatrix} matrix
   */
  protected abstract fitEstimator(matrix: DenseMatrix): TEstimator

  /**
   * Validates that the model is fitted before operations
   * @param {string} methodName
   */
  protected ensureFitted(methodName: string): void {
    if (!this._isFitted || this.estimator === null) {
      throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`)
    }
  }

  /**
   * A template for the transform method
   * @param {XType | DataFrame} x
   */
  transform(x: XType | DataFrame): DenseMatrix | DataFrame {
    this.ensureFitted('transform')
    this.validateInput(x)

    const isDataFrame = x instanceof DataFrame
    let matrix: DenseMatrix

    // Handle DataFrame column selection
    if (isDataFrame && this.columns !== null) {
      matrix = DenseMatrix.f64(x.selectColumnsByName(this.columns).getNumericColumns())
    } else {
      matrix = this.toMatrix(x)
    }

    // 'transformMatrix' implementation is provided by subclasses
    const transformed = this.transformMatrix(matrix)

    // Return same type as input
    return isDataFrame ? this.toDataFrame(transformed) : transformed
  }

  /**
   * @param {DenseMatrix} matrix
   */
  protected abstract transformMatrix(matrix: DenseMatrix): DenseMatrix

  /**
   * Converts DenseMatrix to DataFrame
   * @param {DenseMatrix} matrix
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
        record[this.getComponentColumnName(j)] = matrixData.get([i, j])
      }
      records.push(record)
    }

    return new DataFrame(records)
  }

  /**
   * Create a name for a column given its index
   * @param {number} index - The index of the column
   * @returns {string} The column name derived from the provided index
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

export { BaseDecomposition }
