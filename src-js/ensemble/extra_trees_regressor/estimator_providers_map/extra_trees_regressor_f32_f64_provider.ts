import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF32,
  ExtraTreesRegressorF32F64,
  ExtraTreesRegressorParameters,
} from '../../../core-bindings/index.js'
import { type IExtraTreesRegressorBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setExtraTreesRegressorParametersValues } from './index.js'
import { yAsFloat64Array } from '../../../utilities/index.js'

class ExtraTreesRegressorF32F64Provider
  implements
    PredictorProvider<IExtraTreesRegressorBaseParameters, ExtraTreesRegressorParameters, ExtraTreesRegressorF32F64>
{
  parameters(config: IExtraTreesRegressorBaseParameters): ExtraTreesRegressorParameters {
    const parameters = new ExtraTreesRegressorParameters()
    setExtraTreesRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: ExtraTreesRegressorParameters): ExtraTreesRegressorF32F64 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsF64 = yAsFloat64Array(y)
    return ExtraTreesRegressorF32F64.fit(xAsF32, yAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): ExtraTreesRegressorF32F64 {
    return ExtraTreesRegressorF32F64.deserialize(data)
  }
}

export default ExtraTreesRegressorF32F64Provider
