import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU32, MultinomialNBU32U32, MultinomialNBParameters } from '../../../core-bindings/index.js'
import { type IMultinomialNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setMultinomialNBParametersValues } from './index.js'
import { yAsUint32Array } from '../../../utilities/index.js'

class MultinomialNBU32U32Provider
  implements PredictorProvider<IMultinomialNBBaseParameters, MultinomialNBParameters, MultinomialNBU32U32>
{
  parameters(config: IMultinomialNBBaseParameters): MultinomialNBParameters {
    const parameters = new MultinomialNBParameters()
    setMultinomialNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: MultinomialNBParameters): MultinomialNBU32U32 {
    const xAsU32 = x.asRsMatrix('u32') as DenseMatrixU32
    const yAsUint32 = yAsUint32Array(y)
    return MultinomialNBU32U32.fit(xAsU32, yAsUint32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u32')
  }

  deserialize(data: Buffer): MultinomialNBU32U32 {
    return MultinomialNBU32U32.deserialize(data)
  }
}

export default MultinomialNBU32U32Provider
