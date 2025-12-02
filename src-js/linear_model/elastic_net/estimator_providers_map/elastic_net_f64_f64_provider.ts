import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF64, ElasticNetF64F64, ElasticNetParameters } from '../../../core-bindings/index.js'
import { type IElasticNetBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setElasticNetParametersValues } from './index.js'
import { yAsFloat64Array } from '../../../utilities/index.js'

class ElasticNetF64F64Provider
  implements PredictorProvider<IElasticNetBaseParameters, ElasticNetParameters, ElasticNetF64F64>
{
  parameters(config: IElasticNetBaseParameters): ElasticNetParameters {
    const parameters = new ElasticNetParameters()
    setElasticNetParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: ElasticNetParameters): ElasticNetF64F64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsF64 = yAsFloat64Array(y)
    return ElasticNetF64F64.fit(xAsF64, yAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): ElasticNetF64F64 {
    return ElasticNetF64F64.deserialize(data)
  }
}

export default ElasticNetF64F64Provider
