import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixI32, KMeansI32I32, KMeansParameters } from '../../../core-bindings/index.js'
import { type IKMeansBaseParameters, setKMeansParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class KMeansI32I32Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansI32I32> {
  parameters(config: IKMeansBaseParameters): KMeansParameters {
    const parameters = new KMeansParameters()
    setKMeansParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: KMeansParameters): KMeansI32I32 {
    const xAsI32 = (x as DenseMatrix).asRsMatrix('i32') as DenseMatrixI32
    return KMeansI32I32.fit(xAsI32, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return (x as DenseMatrix).asRsMatrix('i32')
  }

  deserialize(data: Buffer): KMeansI32I32 {
    return KMeansI32I32.deserialize(data)
  }
}

export default KMeansI32I32Provider
