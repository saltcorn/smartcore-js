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
  constructor(parameters: TParams) {
    super(parameters)
  }

  /**
   * A template for the transform method
   * @param {InputType} x
   */
  transform(x: InputType): DenseMatrix | DataFrame {
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
}

export { BaseTransformer }
