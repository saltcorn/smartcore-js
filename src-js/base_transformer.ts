import { DenseMatrix, type InputType } from './index.js'
import { DataFrame } from './data_frame.js'
import type { Transformer } from './pipeline/index.js'
import { BaseEstimator } from './base_estimator.js'

/**
 * Abstract base class for transformers
 */
abstract class BaseTransformer<TEstimator, TParams>
  extends BaseEstimator<TEstimator, TParams>
  implements Transformer<InputType>
{
  constructor(parameters: TParams, selectedColumns?: string[]) {
    super(parameters, selectedColumns)
  }

  /**
   * A template for the transform method
   * @param {InputType} x
   */
  transform(x: InputType): DenseMatrix | DataFrame {
    this.ensureFitted('transform')
    this.validateInput(x)

    if (x instanceof DenseMatrix) console.log(`[${this.name}]: In transform (x: ${x.nrows}, y: ${x.ncols})`)
    if (x instanceof DataFrame) console.log(`[${this.name}]: In transform (x: ${x.rowsCount}, y: ${x.columnsCount})`)

    const isDataFrame = x instanceof DataFrame
    let matrix: DenseMatrix

    // Handle selective column transformation
    if (isDataFrame && this.columns !== null) {
      // Transform only selected columns
      //   console.log(`${this.name}: Transform: `, this.columns)
      //   console.log(`${this.name}: x names: `, x.columnNames)
      const selected = x.selectColumnsByName(this.columns)
      matrix = this.toMatrix(selected)
      console.log(`[${this.name}]: Before transform (x: ${matrix.nrows}, y: ${matrix.ncols})`)
      const transformed = this.transformMatrix(matrix)
      console.log(`[${this.name}]: After transform (x: ${transformed.nrows}, y: ${transformed.ncols})`)

      // Get remaining columns and combine
      const remaining = this.getRemainingColumns(x, this.columns)
      //   console.log(`[${this.name}] Remaining: `, remaining?.columnNames)
      //   if (transformed instanceof DataFrame) console.log(`[${this.name}] Remaining: `, transformed?.columnNames)
      return this.combineResults(transformed, remaining)
    }

    matrix = this.toMatrix(x)

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
   * Gets columns that were not selected for transformation
   */
  protected getRemainingColumns(x: DataFrame, selectedColumns: string[]): DataFrame | null {
    // console.log(`[${this.name}].getRemainingColumns`)
    const allColumns = x.columnNames
    const remainingColumnNames = allColumns.filter((col) => !selectedColumns.includes(col))

    if (remainingColumnNames.length === 0) {
      return null
    }

    // console.log(`[${this.name}] Remaining column names: `, remainingColumnNames)

    return x.selectColumnsByName(remainingColumnNames)
  }

  /**
   * Combines transformed columns with remaining untransformed columns
   */
  protected combineResults(transformed: DenseMatrix | DataFrame, remaining: DataFrame | null): DataFrame {
    const transformedDf = transformed instanceof DenseMatrix ? this.toDataFrame(transformed) : transformed

    if (remaining === null) {
      return transformedDf
    }

    // if (transformed instanceof DataFrame)
    //   console.log(`[${this.name}].combineResults Transformed: `, transformed.columnNames)
    // console.log(`[${this.name}].combineResults Remaining: `, remaining.columnNames)

    // Ensure the rows in both the transformed and remaining matrices columns are equal
    const transformedRecords = transformedDf.toJSON()
    const remainingRecords = remaining.toJSON()

    // console.log(transformedRecords)
    // console.log(remainingRecords)

    if (transformedRecords.length !== remainingRecords.length) {
      throw new Error(
        `${this.name}: Row count mistmatch. Transformed: ${transformedRecords.length}, Remaining: ${remainingRecords.length}`,
      )
    }

    // Merge records
    const combinedRecords = transformedRecords.map((transformedRecord, idx) => ({
      ...transformedRecord,
      ...remainingRecords[idx],
    }))

    const transformedColumns = transformedDf.columnNames
    const remainingColumns = remaining.columnNames

    return new DataFrame(combinedRecords, {
      include: [...transformedColumns, ...remainingColumns],
    })
  }
}

export { BaseTransformer }
