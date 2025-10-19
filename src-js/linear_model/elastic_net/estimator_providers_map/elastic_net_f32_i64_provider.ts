import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, ElasticNetF32I64, ElasticNetParameters } from '../../../core-bindings/index.js'
import { type IElasticNetBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setElasticNetParametersValues } from './index.js'
import { yAsInt64Array } from '../../../utilities/index.js'

class ElasticNetF32I64Provider
  implements PredictorProvider<IElasticNetBaseParameters, ElasticNetParameters, ElasticNetF32I64>
{
  parameters(config: IElasticNetBaseParameters): ElasticNetParameters {
    const parameters = new ElasticNetParameters()
    setElasticNetParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: ElasticNetParameters): ElasticNetF32I64 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsI64 = yAsInt64Array(y)
    return ElasticNetF32I64.fit(xAsF32, yAsI64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): ElasticNetF32I64 {
    return ElasticNetF32I64.deserialize(data)
  }
}

export default ElasticNetF32I64Provider
