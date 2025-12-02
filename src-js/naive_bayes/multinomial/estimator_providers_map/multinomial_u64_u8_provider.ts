import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU64, MultinomialNBU64U8, MultinomialNBParameters } from '../../../core-bindings/index.js'
import { type IMultinomialNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setMultinomialNBParametersValues } from './index.js'
import { yAsUint8Array } from '../../../utilities/index.js'

class MultinomialNBU64U8Provider
  implements PredictorProvider<IMultinomialNBBaseParameters, MultinomialNBParameters, MultinomialNBU64U8>
{
  parameters(config: IMultinomialNBBaseParameters): MultinomialNBParameters {
    const parameters = new MultinomialNBParameters()
    setMultinomialNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: MultinomialNBParameters): MultinomialNBU64U8 {
    const xAsU64 = x.asRsMatrix('u64') as DenseMatrixU64
    const yAsUint8 = yAsUint8Array(y)
    return MultinomialNBU64U8.fit(xAsU64, yAsUint8, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u64')
  }

  deserialize(data: Buffer): MultinomialNBU64U8 {
    return MultinomialNBU64U8.deserialize(data)
  }
}

export default MultinomialNBU64U8Provider
