import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU16, MultinomialNBU16U8, MultinomialNBParameters } from '../../../core-bindings/index.js'
import { type IMultinomialNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setMultinomialNBParametersValues } from './index.js'
import { yAsUint8Array } from '../../../utilities/index.js'

class MultinomialNBU16U8Provider
  implements PredictorProvider<IMultinomialNBBaseParameters, MultinomialNBParameters, MultinomialNBU16U8>
{
  parameters(config: IMultinomialNBBaseParameters): MultinomialNBParameters {
    const parameters = new MultinomialNBParameters()
    setMultinomialNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: MultinomialNBParameters): MultinomialNBU16U8 {
    const xAsU16 = x.asRsMatrix('u16') as DenseMatrixU16
    const yAsUint8 = yAsUint8Array(y)
    return MultinomialNBU16U8.fit(xAsU16, yAsUint8, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u16')
  }

  deserialize(data: Buffer): MultinomialNBU16U8 {
    return MultinomialNBU16U8.deserialize(data)
  }
}

export default MultinomialNBU16U8Provider
