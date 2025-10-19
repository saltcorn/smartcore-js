import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  ExtraTreesRegressorF64F32,
  ExtraTreesRegressorParameters,
} from '../../../core-bindings/index.js'
import { type IExtraTreesRegressorBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setExtraTreesRegressorParametersValues } from './index.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class ExtraTreesRegressorF64F32Provider
  implements
    PredictorProvider<IExtraTreesRegressorBaseParameters, ExtraTreesRegressorParameters, ExtraTreesRegressorF64F32>
{
  parameters(config: IExtraTreesRegressorBaseParameters): ExtraTreesRegressorParameters {
    const parameters = new ExtraTreesRegressorParameters()
    setExtraTreesRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: ExtraTreesRegressorParameters): ExtraTreesRegressorF64F32 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsF64 = yAsFloat32Array(y)
    return ExtraTreesRegressorF64F32.fit(xAsF64, yAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): ExtraTreesRegressorF64F32 {
    return ExtraTreesRegressorF64F32.deserialize(data)
  }
}

export default ExtraTreesRegressorF64F32Provider
