import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { converters } from '../../../linalg/dense-matrix/index.js'
import { KMeansI32I64, KMeansParameters } from '../../../core-bindings/index.js'
import { type IKMeansBaseParameters, setKMeansParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class KMeansI32I32Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansI32I64> {
  parameters(config: IKMeansBaseParameters): KMeansParameters {
    const parameters = new KMeansParameters()
    setKMeansParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: KMeansParameters): KMeansI32I64 {
    const xAsI32 = converters.toDenseMatrixI32(x)
    return KMeansI32I64.fit(xAsI32, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return converters.toDenseMatrixI32(x)
  }

  deserialize(data: Buffer): KMeansI32I64 {
    return KMeansI32I64.deserialize(data)
  }
}

export default KMeansI32I32Provider
