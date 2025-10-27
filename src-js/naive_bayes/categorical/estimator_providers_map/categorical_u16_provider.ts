import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU16, CategoricalNBU16, CategoricalNBParameters } from '../../../core-bindings/index.js'
import { type ICategoricalNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setCategoricalNBParametersValues } from './index.js'
import { yAsUint16Array } from '../../../utilities/index.js'

class CategoricalNBU16Provider
  implements PredictorProvider<ICategoricalNBBaseParameters, CategoricalNBParameters, CategoricalNBU16>
{
  parameters(config: ICategoricalNBBaseParameters): CategoricalNBParameters {
    const parameters = new CategoricalNBParameters()
    setCategoricalNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: CategoricalNBParameters): CategoricalNBU16 {
    const xAsU16 = x.asRsMatrix('u16') as DenseMatrixU16
    const yAsUint16 = yAsUint16Array(y)
    return CategoricalNBU16.fit(xAsU16, yAsUint16, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u16')
  }

  deserialize(data: Buffer): CategoricalNBU16 {
    return CategoricalNBU16.deserialize(data)
  }
}

export default CategoricalNBU16Provider
