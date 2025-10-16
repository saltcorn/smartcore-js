import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF64, KMeansF64I64, KMeansParameters } from '../../../core-bindings/index.js'
import { type IKMeansBaseParameters, setKMeansParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class KMeansF64F64Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansF64I64> {
  parameters(config: IKMeansBaseParameters): KMeansParameters {
    const parameters = new KMeansParameters()
    setKMeansParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: KMeansParameters): KMeansF64I64 {
    const xAsF64 = (x as DenseMatrix).asRsMatrix('f64') as DenseMatrixF64
    return KMeansF64I64.fit(xAsF64, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return (x as DenseMatrix).asRsMatrix('f64')
  }

  deserialize(data: Buffer): KMeansF64I64 {
    return KMeansF64I64.deserialize(data)
  }
}

export default KMeansF64F64Provider
