import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { converters } from '../../../linalg/dense-matrix/index.js'
import { KMeansF32I32, KMeansParameters } from '../../../core-bindings/index.js'
import { type IKMeansBaseParameters, setKMeansParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class KMeansF32F32Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansF32I32> {
  parameters(config: IKMeansBaseParameters): KMeansParameters {
    const parameters = new KMeansParameters()
    setKMeansParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: KMeansParameters): KMeansF32I32 {
    const xAsF32 = converters.toDenseMatrixF32(x)
    return KMeansF32I32.fit(xAsF32, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return converters.toDenseMatrixF32(x)
  }

  deserialize(data: Buffer): KMeansF32I32 {
    return KMeansF32I32.deserialize(data)
  }
}

export default KMeansF32F32Provider
