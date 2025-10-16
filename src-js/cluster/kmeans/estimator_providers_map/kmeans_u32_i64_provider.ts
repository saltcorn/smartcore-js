import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { KMeansU32I64, KMeansParameters, DenseMatrixU32 } from '../../../core-bindings/index.js'
import { type IKMeansBaseParameters, setKMeansParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class KMeansU32U32Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansU32I64> {
  parameters(config: IKMeansBaseParameters): KMeansParameters {
    const parameters = new KMeansParameters()
    setKMeansParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: KMeansParameters): KMeansU32I64 {
    const xAsU32 = (x as DenseMatrix).asRsMatrix('u32') as DenseMatrixU32
    return KMeansU32I64.fit(xAsU32, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return (x as DenseMatrix).asRsMatrix('u32')
  }

  deserialize(data: Buffer): KMeansU32I64 {
    return KMeansU32I64.deserialize(data)
  }
}

export default KMeansU32U32Provider
