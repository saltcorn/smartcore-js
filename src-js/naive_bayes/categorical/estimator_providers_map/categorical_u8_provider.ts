import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU8, CategoricalNBU8, CategoricalNBParameters } from '../../../core-bindings/index.js'
import { type ICategoricalNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setCategoricalNBParametersValues } from './index.js'
import { yAsUint8Array } from '../../../utilities/index.js'

class CategoricalNBU8Provider
  implements PredictorProvider<ICategoricalNBBaseParameters, CategoricalNBParameters, CategoricalNBU8>
{
  parameters(config: ICategoricalNBBaseParameters): CategoricalNBParameters {
    const parameters = new CategoricalNBParameters()
    setCategoricalNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: CategoricalNBParameters): CategoricalNBU8 {
    const xAsU8 = x.asRsMatrix('u8') as DenseMatrixU8
    const yAsUint8 = yAsUint8Array(y)
    return CategoricalNBU8.fit(xAsU8, yAsUint8, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u8')
  }

  deserialize(data: Buffer): CategoricalNBU8 {
    return CategoricalNBU8.deserialize(data)
  }
}

export default CategoricalNBU8Provider
