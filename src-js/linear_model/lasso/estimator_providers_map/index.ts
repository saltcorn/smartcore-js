import { type PredictorProvider } from '../../../estimator.js'
import LassoF32F32Provider from './lasso_f32_f32_provider.js'
import LassoF32F64Provider from './lasso_f32_f64_provider.js'
import LassoF64F32Provider from './lasso_f64_f32_provider.js'
import LassoF64F64Provider from './lasso_f64_f64_provider.js'
import LassoF32I32Provider from './lasso_f32_i32_provider.js'
import LassoF32I64Provider from './lasso_f32_i64_provider.js'
import LassoF32U64Provider from './lasso_f32_u64_provider.js'
import LassoF64I32Provider from './lasso_f64_i32_provider.js'
import LassoF64I64Provider from './lasso_f64_i64_provider.js'
import LassoF64U64Provider from './lasso_f64_u64_provider.js'

type XTypeStr = 'f32' | 'f64'
type YTypeStr = 'f32' | 'f64' | 'i32' | 'i64' | 'u64'

const F32EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<ILassoBaseParameters, any, any>> = new Map()
F32EstimatorProvidersMap.set('f32', new LassoF32F32Provider())
F32EstimatorProvidersMap.set('f64', new LassoF32F64Provider())
F32EstimatorProvidersMap.set('i32', new LassoF32I32Provider())
F32EstimatorProvidersMap.set('i64', new LassoF32I64Provider())
F32EstimatorProvidersMap.set('u64', new LassoF32U64Provider())

const F64EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<ILassoBaseParameters, any, any>> = new Map()
F64EstimatorProvidersMap.set('f32', new LassoF64F32Provider())
F64EstimatorProvidersMap.set('f64', new LassoF64F64Provider())
F64EstimatorProvidersMap.set('i32', new LassoF64I32Provider())
F64EstimatorProvidersMap.set('i64', new LassoF64I64Provider())
F64EstimatorProvidersMap.set('u64', new LassoF64U64Provider())

const EstimatorProvidersMap: Map<XTypeStr, Map<YTypeStr, PredictorProvider<ILassoBaseParameters, any, any>>> = new Map()
EstimatorProvidersMap.set('f32', F32EstimatorProvidersMap)
EstimatorProvidersMap.set('f64', F64EstimatorProvidersMap)

interface ILassoParametersRs {
  withAlpha(alpha: number): void
  withNormalize(normalize: boolean): void
  withTol(tol: number): void
  withMaxIter(maxIter: number): void
}

interface ILassoBaseParameters {
  alpha?: number
  normalize?: boolean
  tol?: number
  maxIter?: number
}

function setLassoParametersValues(parameters: ILassoParametersRs, config: ILassoBaseParameters) {
  if (config.alpha) {
    parameters.withAlpha(config.alpha)
  }
  if (config.normalize) {
    parameters.withNormalize(config.normalize)
  }
  if (config.tol !== undefined) {
    parameters.withTol(config.tol)
  }
  if (config.maxIter !== undefined) {
    parameters.withMaxIter(config.maxIter)
  }
}

export { EstimatorProvidersMap, setLassoParametersValues }
export type { YTypeStr, XTypeStr, ILassoBaseParameters }
