import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixI64, KMeansI64I32, KMeansParameters } from '../../../core-bindings/index.js'
import { type IKMeansBaseParameters, setKMeansParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class KMeansI64I64Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansI64I32> {
  parameters(config: IKMeansBaseParameters): KMeansParameters {
    const parameters = new KMeansParameters()
    setKMeansParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: KMeansParameters): KMeansI64I32 {
    const xAsI64 = x.asRsMatrix('i64') as DenseMatrixI64
    return KMeansI64I32.fit(xAsI64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i64')
  }

  deserialize(data: Buffer): KMeansI64I32 {
    return KMeansI64I32.deserialize(data)
  }
}

export default KMeansI64I64Provider
