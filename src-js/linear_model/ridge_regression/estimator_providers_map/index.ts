import { type TransformerProvider } from '../../../estimator.js'
import RidgeRegressionF32F32Provider from './ridge_regression_f32_f32_provider.js'
import RidgeRegressionF32F64Provider from './ridge_regression_f32_f64_provider.js'
import RidgeRegressionF64F32Provider from './ridge_regression_f64_f32_provider.js'
import RidgeRegressionF64F64Provider from './ridge_regression_f64_f64_provider.js'
import type { RidgeRegressionSolverName } from '../../../core-bindings/index.js'

type XTypeStr = 'f32' | 'f64'
type YTypeStr = 'f32' | 'f64'

const F32EstimatorProvidersMap: Map<YTypeStr, TransformerProvider<IRidgeRegressionBaseParameters, any, any>> = new Map()
F32EstimatorProvidersMap.set('f32', new RidgeRegressionF32F32Provider())
F32EstimatorProvidersMap.set('f64', new RidgeRegressionF32F64Provider())

const F64EstimatorProvidersMap: Map<YTypeStr, TransformerProvider<IRidgeRegressionBaseParameters, any, any>> = new Map()
F32EstimatorProvidersMap.set('f32', new RidgeRegressionF64F32Provider())
F32EstimatorProvidersMap.set('f64', new RidgeRegressionF64F64Provider())

const EstimatorProvidersMap: Map<
  XTypeStr,
  Map<XTypeStr, TransformerProvider<IRidgeRegressionBaseParameters, any, any>>
> = new Map()
EstimatorProvidersMap.set('f32', F32EstimatorProvidersMap)
EstimatorProvidersMap.set('f64', F64EstimatorProvidersMap)

interface IRidgeRegressionParametersRs {
  withAlpha(alpha: number): void
  withNormalize(normalize: boolean): void
  withSolver(solver: RidgeRegressionSolverName): void
}

interface IRidgeRegressionBaseParameters {
  alpha?: number
  normalize?: boolean
  solver?: RidgeRegressionSolverName
}

function setRidgeRegressionParametersValues(
  parameters: IRidgeRegressionParametersRs,
  config: IRidgeRegressionBaseParameters,
) {
  if (config.solver) {
    parameters.withSolver(config.solver)
  }
  if (config.alpha) {
    parameters.withAlpha(config.alpha)
  }
  if (config.normalize) {
    parameters.withNormalize(config.normalize)
  }
}

export { EstimatorProvidersMap, setRidgeRegressionParametersValues }
export type { YTypeStr, XTypeStr, IRidgeRegressionBaseParameters }
