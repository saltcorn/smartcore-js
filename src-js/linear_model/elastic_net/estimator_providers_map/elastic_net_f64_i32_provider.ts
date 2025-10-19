import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF64, ElasticNetF64I32, ElasticNetParameters } from '../../../core-bindings/index.js'
import { type IElasticNetBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setElasticNetParametersValues } from './index.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class ElasticNetF64I32Provider
  implements PredictorProvider<IElasticNetBaseParameters, ElasticNetParameters, ElasticNetF64I32>
{
  parameters(config: IElasticNetBaseParameters): ElasticNetParameters {
    const parameters = new ElasticNetParameters()
    setElasticNetParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: ElasticNetParameters): ElasticNetF64I32 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsI32 = yAsInt32Array(y)
    return ElasticNetF64I32.fit(xAsF64, yAsI32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): ElasticNetF64I32 {
    return ElasticNetF64I32.deserialize(data)
  }
}

export default ElasticNetF64I32Provider
