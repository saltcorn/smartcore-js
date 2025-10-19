import { type PredictorProvider } from '../../../estimator.js'
import LinearRegressionF32F32Provider from './linear_regression_f32_f32_provider.js'
import LinearRegressionF32F64Provider from './linear_regression_f32_f64_provider.js'
import LinearRegressionF64F32Provider from './linear_regression_f64_f32_provider.js'
import LinearRegressionF64F64Provider from './linear_regression_f64_f64_provider.js'
import LinearRegressionF32I32Provider from './linear_regression_f32_i32_provider.js'
import LinearRegressionF32I64Provider from './linear_regression_f32_i64_provider.js'
import LinearRegressionF32U64Provider from './linear_regression_f32_u64_provider.js'
import LinearRegressionF64I32Provider from './linear_regression_f64_i32_provider.js'
import LinearRegressionF64I64Provider from './linear_regression_f64_i64_provider.js'
import LinearRegressionF64U64Provider from './linear_regression_f64_u64_provider.js'
import type { LinearRegressionSolverName } from '../../../core-bindings/index.js'

type XTypeStr = 'f32' | 'f64'
type YTypeStr = 'f32' | 'f64' | 'i32' | 'i64' | 'u64'

const F32EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<ILinearRegressionBaseParameters, any, any>> = new Map()
F32EstimatorProvidersMap.set('f32', new LinearRegressionF32F32Provider())
F32EstimatorProvidersMap.set('f64', new LinearRegressionF32F64Provider())
F32EstimatorProvidersMap.set('i32', new LinearRegressionF32I32Provider())
F32EstimatorProvidersMap.set('i64', new LinearRegressionF32I64Provider())
F32EstimatorProvidersMap.set('u64', new LinearRegressionF32U64Provider())

const F64EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<ILinearRegressionBaseParameters, any, any>> = new Map()
F64EstimatorProvidersMap.set('f32', new LinearRegressionF64F32Provider())
F64EstimatorProvidersMap.set('f64', new LinearRegressionF64F64Provider())
F64EstimatorProvidersMap.set('i32', new LinearRegressionF64I32Provider())
F64EstimatorProvidersMap.set('i64', new LinearRegressionF64I64Provider())
F64EstimatorProvidersMap.set('u64', new LinearRegressionF64U64Provider())

const EstimatorProvidersMap: Map<
  XTypeStr,
  Map<YTypeStr, PredictorProvider<ILinearRegressionBaseParameters, any, any>>
> = new Map()
EstimatorProvidersMap.set('f32', F32EstimatorProvidersMap)
EstimatorProvidersMap.set('f64', F64EstimatorProvidersMap)

interface ILinearRegressionParametersRs {
  withSolver(solver: LinearRegressionSolverName): void
}

interface ILinearRegressionBaseParameters {
  solver?: LinearRegressionSolverName
}

function setLinearRegressionParametersValues(
  parameters: ILinearRegressionParametersRs,
  config: ILinearRegressionBaseParameters,
) {
  if (config.solver) {
    parameters.withSolver(config.solver)
  }
}

export { EstimatorProvidersMap, setLinearRegressionParametersValues }
export type { YTypeStr, XTypeStr, ILinearRegressionBaseParameters }
