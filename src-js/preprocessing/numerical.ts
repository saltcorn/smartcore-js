import { StandardScalerF64, StandardScalerParameters } from '../../core-bindings/index.js'
import { DenseMatrix } from '../linalg/index.js'

type StandardScalerRs = StandardScalerF64
type StandardScalerParametersRs = StandardScalerParameters

interface StandardScalerParametersValues {}

class StandardScaler {
  parameters: StandardScalerParametersRs

  constructor(_params?: StandardScalerParametersValues) {
    this.parameters = new StandardScalerParameters()
  }

  fit(x: DenseMatrix | number[][]): StandardScalerTransformer {
    x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)
    return new StandardScalerTransformer(new StandardScalerF64(x.asF64(), this.parameters))
  }
}

class StandardScalerTransformer {
  inner: StandardScalerRs

  constructor(inner: StandardScalerRs) {
    this.inner = inner
  }

  transform(x: DenseMatrix | number[][]) {
    x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)
    return this.inner.transform(x.asF64())
  }
}

export default StandardScaler
