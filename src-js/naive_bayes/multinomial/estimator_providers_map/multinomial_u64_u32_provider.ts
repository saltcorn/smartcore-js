import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU64, MultinomialNBU64U32, MultinomialNBParameters } from '../../../core-bindings/index.js'
import { type IMultinomialNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setMultinomialNBParametersValues } from './index.js'
import { yAsUint32Array } from '../../../utilities/index.js'

class MultinomialNBU64U32Provider
  implements PredictorProvider<IMultinomialNBBaseParameters, MultinomialNBParameters, MultinomialNBU64U32>
{
  parameters(config: IMultinomialNBBaseParameters): MultinomialNBParameters {
    const parameters = new MultinomialNBParameters()
    setMultinomialNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: MultinomialNBParameters): MultinomialNBU64U32 {
    const xAsU64 = x.asRsMatrix('u64') as DenseMatrixU64
    const yAsUint32 = yAsUint32Array(y)
    return MultinomialNBU64U32.fit(xAsU64, yAsUint32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u64')
  }

  deserialize(data: Buffer): MultinomialNBU64U32 {
    return MultinomialNBU64U32.deserialize(data)
  }
}

export default MultinomialNBU64U32Provider
