import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  ExtraTreesRegressorF64F64,
  ExtraTreesRegressorParameters,
} from '../../../core-bindings/index.js'
import { type IExtraTreesRegressorBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setExtraTreesRegressorParametersValues } from './index.js'
import { yAsFloat64Array } from '../../../utilities/index.js'

class ExtraTreesRegressorF64F64Provider
  implements
    PredictorProvider<IExtraTreesRegressorBaseParameters, ExtraTreesRegressorParameters, ExtraTreesRegressorF64F64>
{
  parameters(config: IExtraTreesRegressorBaseParameters): ExtraTreesRegressorParameters {
    const parameters = new ExtraTreesRegressorParameters()
    setExtraTreesRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: ExtraTreesRegressorParameters): ExtraTreesRegressorF64F64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsF64 = yAsFloat64Array(y)
    return ExtraTreesRegressorF64F64.fit(xAsF64, yAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): ExtraTreesRegressorF64F64 {
    return ExtraTreesRegressorF64F64.deserialize(data)
  }
}

export default ExtraTreesRegressorF64F64Provider
