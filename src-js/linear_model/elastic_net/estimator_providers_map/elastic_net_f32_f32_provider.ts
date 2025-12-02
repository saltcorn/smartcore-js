import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, ElasticNetF32F32, ElasticNetParameters } from '../../../core-bindings/index.js'
import { type IElasticNetBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setElasticNetParametersValues } from './index.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class ElasticNetF32F32Provider
  implements PredictorProvider<IElasticNetBaseParameters, ElasticNetParameters, ElasticNetF32F32>
{
  parameters(config: IElasticNetBaseParameters): ElasticNetParameters {
    const parameters = new ElasticNetParameters()
    setElasticNetParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: ElasticNetParameters): ElasticNetF32F32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsF32 = yAsFloat32Array(y)
    return ElasticNetF32F32.fit(xAsF32, yAsF32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): ElasticNetF32F32 {
    return ElasticNetF32F32.deserialize(data)
  }
}

export default ElasticNetF32F32Provider
