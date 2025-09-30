import { StandardScalerF64, StandardScalerParameters } from '../../core-bindings/index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Transformer } from '../pipeline/index.js'
import type { YType, XType } from '../index.js'

type StandardScalerRs = StandardScalerF64
type StandardScalerParametersRs = StandardScalerParameters

interface StandardScalerParametersValues {}

class StandardScaler implements Estimator<XType, YType, StandardScaler>, Transformer<XType> {
  parameters: StandardScalerParametersRs
  estimator: null | StandardScalerRs = null

  constructor(_params?: StandardScalerParametersValues) {
    this.parameters = new StandardScalerParameters()
  }

  fit(x: XType, _y: YType): StandardScaler {
    x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)
    this.estimator = new StandardScalerF64(x.asF64(), this.parameters)
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

export default StandardScaler
