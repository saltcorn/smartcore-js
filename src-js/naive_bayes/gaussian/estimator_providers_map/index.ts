import { type PredictorProvider } from '../../../estimator.js'
import GaussianNBF32U64Provider from './gaussian_f32_u64_provider.js'
import GaussianNBF32U32Provider from './gaussian_f32_u32_provider.js'
import GaussianNBF32U16Provider from './gaussian_f32_u16_provider.js'
import GaussianNBF32U8Provider from './gaussian_f32_u8_provider.js'
import GaussianNBF64U32Provider from './gaussian_f64_u32_provider.js'
import GaussianNBF64U64Provider from './gaussian_f64_u64_provider.js'
import GaussianNBF64U16Provider from './gaussian_f64_u16_provider.js'
import GaussianNBF64U8Provider from './gaussian_f64_u8_provider.js'

type XTypeStr = 'f32' | 'f64'
type YTypeStr = 'u32' | 'u64' | 'u16' | 'u8'

const F32EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IGaussianNBBaseParameters, any, any>> = new Map()
F32EstimatorProvidersMap.set('u32', new GaussianNBF32U32Provider())
F32EstimatorProvidersMap.set('u64', new GaussianNBF32U64Provider())
F32EstimatorProvidersMap.set('u16', new GaussianNBF32U16Provider())
F32EstimatorProvidersMap.set('u8', new GaussianNBF32U8Provider())

const F64EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IGaussianNBBaseParameters, any, any>> = new Map()
F64EstimatorProvidersMap.set('u32', new GaussianNBF64U32Provider())
F64EstimatorProvidersMap.set('u64', new GaussianNBF64U64Provider())
F64EstimatorProvidersMap.set('u16', new GaussianNBF64U16Provider())
F64EstimatorProvidersMap.set('u8', new GaussianNBF64U8Provider())

const EstimatorProvidersMap: Map<
  XTypeStr,
  Map<YTypeStr, PredictorProvider<IGaussianNBBaseParameters, any, any>>
> = new Map()
EstimatorProvidersMap.set('f32', F32EstimatorProvidersMap)
EstimatorProvidersMap.set('f64', F64EstimatorProvidersMap)

interface IGaussianNBParametersRs {
  withPriors(priors: Float64Array): void
}

interface IGaussianNBBaseParameters {
  priors?: Float64Array
}

function setGaussianNBParametersValues(parameters: IGaussianNBParametersRs, config: IGaussianNBBaseParameters) {
  if (config.priors !== undefined) {
    parameters.withPriors(config.priors)
  }
}

export { EstimatorProvidersMap, setGaussianNBParametersValues }
export type { YTypeStr, XTypeStr, IGaussianNBBaseParameters }
