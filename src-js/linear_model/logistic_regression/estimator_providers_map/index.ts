import { type PredictorProvider } from '../../../estimator.js'
import LogisticRegressionF32I32Provider from './logistic_regression_f32_i32_provider.js'
import LogisticRegressionF32I64Provider from './logistic_regression_f32_i64_provider.js'
import LogisticRegressionF32U64Provider from './logistic_regression_f32_u64_provider.js'
import LogisticRegressionF64I32Provider from './logistic_regression_f64_i32_provider.js'
import LogisticRegressionF64I64Provider from './logistic_regression_f64_i64_provider.js'
import LogisticRegressionF64U64Provider from './logistic_regression_f64_u64_provider.js'
import type { LogisticRegressionSolverName } from '../../../core-bindings/index.js'

type XTypeStr = 'f32' | 'f64'
type YTypeStr = 'i32' | 'i64' | 'u64'

const F32EstimatorProvidersMap: Map<
  YTypeStr,
  PredictorProvider<ILogisticRegressionBaseParameters, any, any>
> = new Map()
F32EstimatorProvidersMap.set('i32', new LogisticRegressionF32I32Provider())
F32EstimatorProvidersMap.set('i64', new LogisticRegressionF32I64Provider())
F32EstimatorProvidersMap.set('u64', new LogisticRegressionF32U64Provider())

const F64EstimatorProvidersMap: Map<
  YTypeStr,
  PredictorProvider<ILogisticRegressionBaseParameters, any, any>
> = new Map()
F64EstimatorProvidersMap.set('i32', new LogisticRegressionF64I32Provider())
F64EstimatorProvidersMap.set('i64', new LogisticRegressionF64I64Provider())
F64EstimatorProvidersMap.set('u64', new LogisticRegressionF64U64Provider())

const EstimatorProvidersMap: Map<
  XTypeStr,
  Map<YTypeStr, PredictorProvider<ILogisticRegressionBaseParameters, any, any>>
> = new Map()
EstimatorProvidersMap.set('f32', F32EstimatorProvidersMap)
EstimatorProvidersMap.set('f64', F64EstimatorProvidersMap)

interface ILogisticRegressionParametersRs {
  withAlpha(alpha: number): void
  withSolver(solver: LogisticRegressionSolverName): void
}

interface ILogisticRegressionBaseParameters {
  alpha?: number
  solver?: LogisticRegressionSolverName
}

function setLogisticRegressionParametersValues(
  parameters: ILogisticRegressionParametersRs,
  config: ILogisticRegressionBaseParameters,
) {
  if (config.alpha) {
    parameters.withAlpha(config.alpha)
  }
  if (config.solver) {
    parameters.withSolver(config.solver)
  }
}

export { EstimatorProvidersMap, setLogisticRegressionParametersValues }
export type { YTypeStr, XTypeStr, ILogisticRegressionBaseParameters }
