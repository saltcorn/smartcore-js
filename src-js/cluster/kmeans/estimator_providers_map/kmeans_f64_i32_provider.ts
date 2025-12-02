import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF64, KMeansF64I32, KMeansParameters } from '../../../core-bindings/index.js'
import { type IKMeansBaseParameters, setKMeansParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class KMeansF64F64Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansF64I32> {
  parameters(config: IKMeansBaseParameters): KMeansParameters {
    const parameters = new KMeansParameters()
    setKMeansParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: KMeansParameters): KMeansF64I32 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    return KMeansF64I32.fit(xAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): KMeansF64I32 {
    return KMeansF64I32.deserialize(data)
  }
}

export default KMeansF64F64Provider
