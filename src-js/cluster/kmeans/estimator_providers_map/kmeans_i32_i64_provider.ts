import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixI32, KMeansI32I64, KMeansParameters } from '../../../core-bindings/index.js'
import { type IKMeansBaseParameters, setKMeansParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class KMeansI32I32Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansI32I64> {
  parameters(config: IKMeansBaseParameters): KMeansParameters {
    const parameters = new KMeansParameters()
    setKMeansParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: KMeansParameters): KMeansI32I64 {
    const xAsI32 = x.asRsMatrix('i32') as DenseMatrixI32
    return KMeansI32I64.fit(xAsI32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i32')
  }

  deserialize(data: Buffer): KMeansI32I64 {
    return KMeansI32I64.deserialize(data)
  }
}

export default KMeansI32I32Provider
