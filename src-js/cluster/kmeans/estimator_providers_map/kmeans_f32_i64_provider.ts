import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, KMeansF32I64, KMeansParameters } from '../../../core-bindings/index.js'
import { type IKMeansBaseParameters, setKMeansParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class KMeansF32F32Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansF32I64> {
  parameters(config: IKMeansBaseParameters): KMeansParameters {
    const parameters = new KMeansParameters()
    setKMeansParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: KMeansParameters): KMeansF32I64 {
    const xAsF32 = (x as DenseMatrix).asRsMatrix('f32') as DenseMatrixF32
    return KMeansF32I64.fit(xAsF32, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return (x as DenseMatrix).asRsMatrix('f32')
  }

  deserialize(data: Buffer): KMeansF32I64 {
    return KMeansF32I64.deserialize(data)
  }
}

export default KMeansF32F32Provider
