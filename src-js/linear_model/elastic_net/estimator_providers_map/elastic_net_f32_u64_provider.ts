import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, ElasticNetF32U64, ElasticNetParameters } from '../../../core-bindings/index.js'
import { type IElasticNetBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setElasticNetParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class ElasticNetF32U64Provider
  implements PredictorProvider<IElasticNetBaseParameters, ElasticNetParameters, ElasticNetF32U64>
{
  parameters(config: IElasticNetBaseParameters): ElasticNetParameters {
    const parameters = new ElasticNetParameters()
    setElasticNetParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: ElasticNetParameters): ElasticNetF32U64 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsU64 = yAsUint64Array(y)
    return ElasticNetF32U64.fit(xAsF32, yAsU64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): ElasticNetF32U64 {
    return ElasticNetF32U64.deserialize(data)
  }
}

export default ElasticNetF32U64Provider
