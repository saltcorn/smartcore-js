import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU8, MultinomialNBU8U8, MultinomialNBParameters } from '../../../core-bindings/index.js'
import { type IMultinomialNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setMultinomialNBParametersValues } from './index.js'
import { yAsUint8Array } from '../../../utilities/index.js'

class MultinomialNBU8U8Provider
  implements PredictorProvider<IMultinomialNBBaseParameters, MultinomialNBParameters, MultinomialNBU8U8>
{
  parameters(config: IMultinomialNBBaseParameters): MultinomialNBParameters {
    const parameters = new MultinomialNBParameters()
    setMultinomialNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: MultinomialNBParameters): MultinomialNBU8U8 {
    const xAsU8 = x.asRsMatrix('u8') as DenseMatrixU8
    const yAsUint8 = yAsUint8Array(y)
    return MultinomialNBU8U8.fit(xAsU8, yAsUint8, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u8')
  }

  deserialize(data: Buffer): MultinomialNBU8U8 {
    return MultinomialNBU8U8.deserialize(data)
  }
}

export default MultinomialNBU8U8Provider
