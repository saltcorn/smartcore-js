import { OneHotEncoderF64, OneHotEncoderParameters } from '../../core-bindings/index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Transformer } from '../pipeline/index.js'
import type { YType, XType } from '../index.js'

type OneHotEncoderRs = OneHotEncoderF64
type OneHotEncoderParametersRs = OneHotEncoderParameters

interface OneHotEncoderParametersValues {
  categoricalParams: BigUint64Array
}

class OneHotEncoder implements Estimator<XType, YType, OneHotEncoder>, Transformer<XType> {
  parameters: OneHotEncoderParametersRs
  estimator: null | OneHotEncoderRs = null
  public static readonly className = 'OneHotEncoder'
  public readonly name: string = OneHotEncoder.className

  constructor(params: OneHotEncoderParametersValues) {
    this.parameters = new OneHotEncoderParameters(params.categoricalParams)
  }

  fit(x: XType, _y: YType): OneHotEncoder {
    x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)
    this.estimator = new OneHotEncoderF64(x.asF64(), this.parameters)
    return this
  }

  transform(x: XType): XType {
    if (this.estimator === null) {
      throw new Error("The 'fit' method should called before the 'transform' method is called.")
    }
    x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)
    return new DenseMatrix(this.estimator.transform(x.asF64()))
  }
}

export default OneHotEncoder
