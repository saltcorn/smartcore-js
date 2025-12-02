import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU32, CategoricalNBU32, CategoricalNBParameters } from '../../../core-bindings/index.js'
import { type ICategoricalNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setCategoricalNBParametersValues } from './index.js'
import { yAsUint32Array } from '../../../utilities/index.js'

class CategoricalNBU32Provider
  implements PredictorProvider<ICategoricalNBBaseParameters, CategoricalNBParameters, CategoricalNBU32>
{
  parameters(config: ICategoricalNBBaseParameters): CategoricalNBParameters {
    const parameters = new CategoricalNBParameters()
    setCategoricalNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: CategoricalNBParameters): CategoricalNBU32 {
    const xAsU32 = x.asRsMatrix('u32') as DenseMatrixU32
    const yAsUint32 = yAsUint32Array(y)
    return CategoricalNBU32.fit(xAsU32, yAsUint32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u32')
  }

  deserialize(data: Buffer): CategoricalNBU32 {
    return CategoricalNBU32.deserialize(data)
  }
}

export default CategoricalNBU32Provider
