import { PCAParameters, PCAF64 } from '../../core-bindings/index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { SerDe } from '../pipeline/index.js'

interface PCAParametersVals {
  nComponents?: number
  useCorrelationMatrix?: boolean
}

type PCARs = PCAF64

class PCATransformer implements SerDe<PCATransformer> {
  private inner: PCARs

  constructor(inner: PCARs) {
    this.inner = inner
  }

  transform(x: DenseMatrix | number[][]): DenseMatrix {
    x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)
    return new DenseMatrix(this.inner.transform(x.asF64()))
  }

  serialize(): Buffer {
    return this.inner.serialize()
  }

  deserialize(data: Buffer): PCATransformer {
    return new PCATransformer(PCAF64.deserialize(data))
  }
}

class PCA {
  private parameters: PCAParameters

  constructor(params: PCAParametersVals) {
    let parameters = new PCAParameters()
    if (params.nComponents !== undefined) {
      parameters.withNComponents(params.nComponents)
    }
    if (params.useCorrelationMatrix !== undefined) {
      parameters.useCorrelationMatrix = params.useCorrelationMatrix
    }
    this.parameters = parameters
  }

  fit(x: DenseMatrix | number[][], _y: number[]): PCATransformer {
    x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)
    return new PCATransformer(new PCAF64(x.asF64(), this.parameters))
  }
}

export default PCA
