import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { converters } from '../../../linalg/dense-matrix/index.js'
import { KMeansI64I64, KMeansParameters } from '../../../core-bindings/index.js'
import { type IKMeansBaseParameters, setKMeansParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class KMeansI64I64Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansI64I64> {
  parameters(config: IKMeansBaseParameters): KMeansParameters {
    const parameters = new KMeansParameters()
    setKMeansParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: KMeansParameters): KMeansI64I64 {
    const xAsI64 = converters.toDenseMatrixI64(x)
    return KMeansI64I64.fit(xAsI64, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return converters.toDenseMatrixI64(x)
  }

  deserialize(data: Buffer): KMeansI64I64 {
    return KMeansI64I64.deserialize(data)
  }
}

export default KMeansI64I64Provider
