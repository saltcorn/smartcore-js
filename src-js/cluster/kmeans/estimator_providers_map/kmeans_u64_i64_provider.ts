import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { KMeansU64I64, KMeansParameters, DenseMatrixU64 } from '../../../core-bindings/index.js'
import { type IKMeansBaseParameters, setKMeansParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class KMeansU64U64Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansU64I64> {
  parameters(config: IKMeansBaseParameters): KMeansParameters {
    const parameters = new KMeansParameters()
    setKMeansParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: KMeansParameters): KMeansU64I64 {
    const xAsU64 = (x as DenseMatrix).asRsMatrix('u64') as DenseMatrixU64
    return KMeansU64I64.fit(xAsU64, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return (x as DenseMatrix).asRsMatrix('u64')
  }

  deserialize(data: Buffer): KMeansU64I64 {
    return KMeansU64I64.deserialize(data)
  }
}

export default KMeansU64U64Provider
