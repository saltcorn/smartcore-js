import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU64, CategoricalNBU64, CategoricalNBParameters } from '../../../core-bindings/index.js'
import { type ICategoricalNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setCategoricalNBParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class CategoricalNBU64Provider
  implements PredictorProvider<ICategoricalNBBaseParameters, CategoricalNBParameters, CategoricalNBU64>
{
  parameters(config: ICategoricalNBBaseParameters): CategoricalNBParameters {
    const parameters = new CategoricalNBParameters()
    setCategoricalNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: CategoricalNBParameters): CategoricalNBU64 {
    const xAsU64 = x.asRsMatrix('u64') as DenseMatrixU64
    const yAsUint64 = yAsUint64Array(y)
    return CategoricalNBU64.fit(xAsU64, yAsUint64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u64')
  }

  deserialize(data: Buffer): CategoricalNBU64 {
    return CategoricalNBU64.deserialize(data)
  }
}

export default CategoricalNBU64Provider
