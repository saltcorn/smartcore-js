import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU64, MultinomialNBU64U16, MultinomialNBParameters } from '../../../core-bindings/index.js'
import { type IMultinomialNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setMultinomialNBParametersValues } from './index.js'
import { yAsUint16Array } from '../../../utilities/index.js'

class MultinomialNBU64U16Provider
  implements PredictorProvider<IMultinomialNBBaseParameters, MultinomialNBParameters, MultinomialNBU64U16>
{
  parameters(config: IMultinomialNBBaseParameters): MultinomialNBParameters {
    const parameters = new MultinomialNBParameters()
    setMultinomialNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: MultinomialNBParameters): MultinomialNBU64U16 {
    const xAsU64 = x.asRsMatrix('u64') as DenseMatrixU64
    const yAsUint16 = yAsUint16Array(y)
    return MultinomialNBU64U16.fit(xAsU64, yAsUint16, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u64')
  }

  deserialize(data: Buffer): MultinomialNBU64U16 {
    return MultinomialNBU64U16.deserialize(data)
  }
}

export default MultinomialNBU64U16Provider
