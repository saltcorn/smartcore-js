import { type PredictorProvider } from '../../../estimator.js'
import ElasticNetF32F32Provider from './elastic_net_f32_f32_provider.js'
import ElasticNetF32F64Provider from './elastic_net_f32_f64_provider.js'
import ElasticNetF64F32Provider from './elastic_net_f64_f32_provider.js'
import ElasticNetF64F64Provider from './elastic_net_f64_f64_provider.js'
import ElasticNetF32I32Provider from './elastic_net_f32_i32_provider.js'
import ElasticNetF32I64Provider from './elastic_net_f32_i64_provider.js'
import ElasticNetF32U64Provider from './elastic_net_f32_u64_provider.js'
import ElasticNetF64I32Provider from './elastic_net_f64_i32_provider.js'
import ElasticNetF64I64Provider from './elastic_net_f64_i64_provider.js'
import ElasticNetF64U64Provider from './elastic_net_f64_u64_provider.js'

type XTypeStr = 'f32' | 'f64'
type YTypeStr = 'f32' | 'f64' | 'i32' | 'i64' | 'u64'

const F32EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IElasticNetBaseParameters, any, any>> = new Map()
F32EstimatorProvidersMap.set('f32', new ElasticNetF32F32Provider())
F32EstimatorProvidersMap.set('f64', new ElasticNetF32F64Provider())
F32EstimatorProvidersMap.set('i32', new ElasticNetF32I32Provider())
F32EstimatorProvidersMap.set('i64', new ElasticNetF32I64Provider())
F32EstimatorProvidersMap.set('u64', new ElasticNetF32U64Provider())

const F64EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IElasticNetBaseParameters, any, any>> = new Map()
F64EstimatorProvidersMap.set('f32', new ElasticNetF64F32Provider())
F64EstimatorProvidersMap.set('f64', new ElasticNetF64F64Provider())
F64EstimatorProvidersMap.set('i32', new ElasticNetF64I32Provider())
F64EstimatorProvidersMap.set('i64', new ElasticNetF64I64Provider())
F64EstimatorProvidersMap.set('u64', new ElasticNetF64U64Provider())

const EstimatorProvidersMap: Map<
  XTypeStr,
  Map<YTypeStr, PredictorProvider<IElasticNetBaseParameters, any, any>>
> = new Map()
EstimatorProvidersMap.set('f32', F32EstimatorProvidersMap)
EstimatorProvidersMap.set('f64', F64EstimatorProvidersMap)

interface IElasticNetParametersRs {
  withAlpha(alpha: number): void
  withL1Ratio(l1Ratio: number): void
  withNormalize(normalize: boolean): void
  withTol(tol: number): void
  withMaxIter(maxIter: number): void
}

interface IElasticNetBaseParameters {
  alpha?: number
  l1Ratio?: number
  normalize?: boolean
  tol?: number
  maxIter?: number
}

function setElasticNetParametersValues(parameters: IElasticNetParametersRs, config: IElasticNetBaseParameters) {
  if (config.alpha) {
    parameters.withAlpha(config.alpha)
  }
  if (config.l1Ratio !== undefined) {
    parameters.withL1Ratio(config.l1Ratio)
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

export { EstimatorProvidersMap, setElasticNetParametersValues }
export type { YTypeStr, XTypeStr, IElasticNetBaseParameters }
