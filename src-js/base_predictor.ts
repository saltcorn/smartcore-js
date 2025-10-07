import { DenseMatrix, type InputType } from './index.js'
import { DataFrame } from './data_frame.js'
import type { Predictor } from './pipeline/index.js'
import { BaseEstimator } from './base_estimator.js'

/**
 * Abstract base class for predictors
 */
abstract class BasePredictor<TEstimator, TParams, PredictionType>
  extends BaseEstimator<TEstimator, TParams>
  implements Predictor<InputType, PredictionType>
{
  constructor(parameters: TParams) {
    super(parameters)
  }

  /**
   * A template for the transform method
   * @param {InputType} x
   */
  predict(x: InputType): PredictionType {
    this.ensureFitted('transform')
    this.validateInput(x)

    if (x instanceof DenseMatrix) console.log(`[${this.name}].predict (x: ${x.nrows}, y: ${x.ncols})`)
    if (x instanceof DataFrame) console.log(`[${this.name}].predict (x: ${x.rowsCount}, y: ${x.columnsCount}) `)

    const isDataFrame = x instanceof DataFrame
    let matrix: DenseMatrix

    // Handle DataFrame column selection
    if (isDataFrame && this.columns !== null) {
      matrix = DenseMatrix.f64(x.selectColumnsByName(this.columns).getNumericColumns(), true)
    } else {
      matrix = this.toMatrix(x)
    }

    // 'predictMatrix' implementation is provided by subclasses
    return this.predictMatrix(matrix)
  }

  /**
   * @param {DenseMatrix} matrix
   */
  protected abstract predictMatrix(matrix: DenseMatrix): PredictionType
}

export { BasePredictor }
