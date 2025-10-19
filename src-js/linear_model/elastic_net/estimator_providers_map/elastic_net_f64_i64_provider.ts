import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF64, ElasticNetF64I64, ElasticNetParameters } from '../../../core-bindings/index.js'
import { type IElasticNetBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setElasticNetParametersValues } from './index.js'
import { yAsInt64Array } from '../../../utilities/index.js'

class ElasticNetF64I64Provider
  implements PredictorProvider<IElasticNetBaseParameters, ElasticNetParameters, ElasticNetF64I64>
{
  parameters(config: IElasticNetBaseParameters): ElasticNetParameters {
    const parameters = new ElasticNetParameters()
    setElasticNetParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: ElasticNetParameters): ElasticNetF64I64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsI64 = yAsInt64Array(y)
    return ElasticNetF64I64.fit(xAsF64, yAsI64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): ElasticNetF64I64 {
    return ElasticNetF64I64.deserialize(data)
  }
}

export default ElasticNetF64I64Provider
